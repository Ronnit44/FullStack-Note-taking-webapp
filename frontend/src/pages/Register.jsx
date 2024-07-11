import Form from "../components/form"
function Register(){
    return <Form route="/api/user/register/" method="register" />
}

export default Register
// import React from "react"
// import { Link } from "react-router-dom"
// import Form from "../components/form"

// function Register() {
//   return (
//     <div>
//       <Form route="/api/user/register/" method="register" />
//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <p>Already have an account?</p>
//         <Link to="/login">
//           <button>Login</button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Register
