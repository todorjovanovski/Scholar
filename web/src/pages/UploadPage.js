import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileDropzone from '../components/FileDropzone';
import { useFlashcards } from "../context/FlashcardContext";
import Flashcard from "../components/Flashcard";
import '../App.css';

function UploadPage() {
  const [pdfFile, setPdfFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetDropzone, setResetDropzone] = useState(false);
  const [error, setError] = useState("");
  const [qna, setQna] = useState(null);
  const { addFlashcard } = useFlashcards();
  const navigate = useNavigate();

  function handlePdfFile(acceptedFiles) {
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setPdfFile({
      selectedFile: file,
      title: file.name || "Untitled",
    });
    setError("");
  }

  function logFile() {
    console.log(pdfFile);
  }

  async function uploadPdf() {
    if (!pdfFile.selectedFile) {
      setError("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile.selectedFile);
    formData.append("title", pdfFile.title || "Untitled");

    try {
      setLoading(true);
      setError("");
      setQna(null);

      const uploadResponse = await fetch("http://localhost:8000/upload_pdf", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload PDF.");
      }

      const uploadData = await uploadResponse.json();
      const chatId = uploadData["file-id"];

      const question = "Summarize this lecture";
      const queryForm = new FormData();
      queryForm.append("question", question);
      queryForm.append("chat_id", chatId);

      const queryResponse = await fetch("http://localhost:8000/query_attachments", {
        method: "POST",
        body: queryForm,
      });

      if (!queryResponse.ok) {
        throw new Error("Failed to fetch flashcard.");
      }

      const data = await queryResponse.json();
      setQna(data);
      addFlashcard(data);

      setPdfFile({});
      setResetDropzone(prev => !prev);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Upload PDF</h1>
      <div className="upload-section">
        <FileDropzone onChange={handlePdfFile} resetSignal={resetDropzone}/>
        <div className="button-group">
          <button className="button" onClick={uploadPdf} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
          <button className="button" onClick={logFile}>
            Log
          </button>
        </div>

        {loading && <div className="spinner" />}
        {error && <p className="error-message">{error}</p>}

      </div>
      <button className="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
      {qna && (
        <Flashcard
          question={qna.question}
          answer={qna.answer}
          onClose={() => setQna(null)}
        />
      )
      }
    </div>
  );
}

export default UploadPage;
