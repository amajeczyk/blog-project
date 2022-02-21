import React from "react";
import "../../style/GoToLoginPage.css";
import { useNavigate } from "react-router-dom";
import "../../style/Login.css";

function GoToLoginPage() {
  const navigate = useNavigate();

  return (
    <div className="go-to-login-main">
      <div className="go-to-login-header">You have to login</div>
      <button
        className="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </div>
  );
}

export default GoToLoginPage;
