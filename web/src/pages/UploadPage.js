import { useNavigate } from "react-router-dom";
import FileDropzone from "../components/FileDropzone";

function UploadPage() {
  const navigate = useNavigate();
  const handleFiles = (files) => {
    console.log('Accepted files: ', files)
  }
  return (
    <div className="container">
      <h1>Upload PDF</h1>
      <div className="upload-section dropzone">
        <FileDropzone onFilesAccepted={handleFiles}/>
      </div>
      <button className="button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default UploadPage;
