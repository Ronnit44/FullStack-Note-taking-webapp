import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/form"; 

function Login() {
  return (
    <div>
      <Form route="/api/token/" method="login" />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h2>Don't have an account? <Link to="/register" className="register-link">Register Here</Link></h2>
         
      
      </div>
    </div>
  );
}

export default Login;
