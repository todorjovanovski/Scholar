import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileDropzone from "../components/FileDropzone";
import "../App.css";

function UploadPage() {
  const [pdfFile, setPdfFile] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  function handlePdfFile(event) {
    setPdfFile({ selectedFile: event.target.files[0] });
  }

  async function uploadPdf() {
    const formData = new FormData();
    formData.append("file", pdfFile.selectedFile);
    formData.append("title", pdfFile.selectedFile.name);

    setIsUploading(true);

    try {
      const response = await fetch("http://localhost:8000/upload_pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="container">
      <h1>Upload PDF</h1>
      <div className="upload-section">
        <FileDropzone onChange={handlePdfFile} />
        {isUploading && <p className="description">Uploading...</p>}
        <div className="button-group">
          <button className="button" onClick={uploadPdf}>
            Upload
          </button>
        </div>
      </div>
      <button className="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default UploadPage;
