import React from "react";
import "../../../styles/loadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="m-auto w-50 d-flex">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
