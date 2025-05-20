import { useNavigate, useLocation } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const errorState = location.state || {};

  const errorMessage = errorState.message || "An unexpected error occurred.";
  const errorDetails = errorState.details || "No additional details available.";

  const statusCode = errorState.status;

  return (
    <div className="container">
      <h1>Something unexpected occurred!</h1>
      {statusCode && <h2>Status: {statusCode}</h2>}
      <h2>{errorMessage}</h2>

      <div className="error-details-box">
        <p>Details:</p>
        <pre>{errorDetails}</pre>
      </div>

      <button className="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default ErrorPage;
