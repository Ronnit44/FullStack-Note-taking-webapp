// import Form from "../components/form"

// function Login() {
//     return <Form route="/api/token/" method="login" />
// }

// export default Login
import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/form"; // Assuming Form component is correctly imported

function Login() {
  return (
    <div>
      <Form route="/api/token/" method="login" />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>Don't have an account?</p>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
