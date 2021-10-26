import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/error.css";
const Error = () => {
  return (
    <>
      <div className="error-content">
        <h2>ERROR 404 : Page not found</h2>
        <p>Requested page is unavailable.</p>
        <Link to="/home">&#x21A9; Back to home.</Link>
      </div>
    </>
  );
};
export default Error;
