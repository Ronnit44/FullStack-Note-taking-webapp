import React from "react";
import Form from "../components/form";
import { Link } from "react-router-dom"; 

function Register() {
  return (
    <div>
      <Form route="/api/user/register/" method="register" />
      
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h2>
          Already have an account?{" "}
          <Link to="/login" className="register-link">Login here</Link>
        </h2>
      </div>
    </div>
  );
}

export default Register;
