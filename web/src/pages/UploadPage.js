import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileDropzone from '../components/FileDropzone';
import '../App.css';

function UploadPage() {
  const [pdfFile, setPdfFile] = useState({});
  const navigate = useNavigate();

  function handlePdfFile(event) {
    setPdfFile({ selectedFile: event.target.files[0] });
  }

  function logFile() {
    console.log(pdfFile);
  }

  async function uploadPdf() {
    const formData = new FormData();
    formData.append("file", pdfFile.selectedFile);
    formData.append("title", pdfFile.selectedFile.title);

    await fetch("http://localhost:8000/upload_pdf", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <div className="container">
      <h1>Upload PDF</h1>
      <div className="upload-section">
        <FileDropzone onChange={handlePdfFile}/>
        <div className="button-group">
          <button className="button" onClick={uploadPdf}>
            Upload
          </button>
          <button className="button" onClick={logFile}>
            Log
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
