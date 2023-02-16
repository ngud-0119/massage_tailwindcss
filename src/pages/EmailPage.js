import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../assets/logo.png";
import "@fontsource/open-sans";
import "../css/loginPage.css";
import designImag from "../assets/left-login.png";
import { emailApi } from "../axiosCalls";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { signupApi, TokenVerify, updateProfile } from "../axiosCalls";

// import { MDBInput } from "../../node_modules/mdb-react-ui-kit";
export default function EmailPage() {
  const search = useLocation().search;
  const [isValid, setIsValid] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      const newtoken = new URLSearchParams(search).get("token");

      TokenVerify(newtoken)
        .then((res) => {
          console.log(res);
          if (!res.data.success) {
            setIsValid("false");
          } else {
            setIsValid("true");
          }
        })
        .catch((err) => {
          setIsValid("false");
        });
    };

    fetchData();
  }, []);

  return (
    <Row className="login-page">
      <Col className="login-form-left">
        <img className="logo" src={logo} />
        <div className="d-flex align-items-center justify-content-center">
          <h1>Welcome to bodyslides</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p>
            Biggest massage oriented forums on the planet - user reviews,
            Recommendations and discussion forums of massage parlours services &
            entertainment
          </p>
        </div>
        {/* <img src={designImag} className='left-side-design-img' /> */}
      </Col>
      <Col className="email-form-right auth-form">
        {/* <div className="auth-heading">Sign Up With bodyslides</div> */}
        <br />

        {isValid && (
          <>
            {" "}
            {isValid === "true" ? (
              <>
                <div
                  className="auth-description"
                  style={{
                    fontWeight: 600,
                    fontSize: "21px",
                    color: "#c8175d",
                  }}
                >
                  Your email Verification successfull, click on below <br />{" "}
                  link to login on bodyslide website <br /> <br />
                  <NavLink
                    to="/login"
                    className="forgotpassword"
                    style={{ fontSize: "18px" }}
                  >
                    Sign In to bodyslides
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <div
                  className="auth-description"
                  style={{ fontWeight: 600, fontSize: "21px", color: "red" }}
                >
                  Your email Verification failed,Token is expire or invalid.{" "}
                  <br />
                  Click below link to signup on bodyslide website again <br />{" "}
                  <br />
                  <NavLink
                    to="/signup"
                    className="forgotpassword"
                    style={{ fontSize: "18px" }}
                  >
                    Sign Up to bodyslides
                  </NavLink>
                </div>
              </>
            )}
          </>
        )}
      </Col>
    </Row>
  );
}

// old emailPage
// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Row, Col } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import "@fontsource/open-sans";
// import "../css/loginPage.css";
// import designImag from "../assets/left-login.png";
// import { emailApi } from "../axiosCalls";
// import {
//   MDBInput,
//   MDBCol,
//   MDBRow,
//   MDBCheckbox,
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
// } from "mdb-react-ui-kit";

// // import { MDBInput } from "../../node_modules/mdb-react-ui-kit";
// export default function EmailPage() {
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const [email, setEmail] = useState("");
//   const [varifyMessage, setVerifyMessage] = useState(null);

//   const onChange = (e) => {
//     setEmail(e.target.value);
//   };
//   const submitHandler = async () => {
//     setVerifyMessage(null);
//     let errors = {};
//     if (email) {
//       const validEmail = new RegExp(
//         "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
//       );
//       if (!validEmail.test(email)) {
//         errors["email"] = "Incorrect email";
//       }
//     }
//     if (!email) {
//       errors["email"] = "Email is required";
//     }
//     if (Object.keys(errors).length <= 0) {
//       // navigate('/signup');

//       const response = await emailApi(email, setVerifyMessage);

//       console.log(response, "email Response");
//     } else {
//       setErrors(errors);
//     }
//   };
//   const handleKeypress = (e) => {
//     // console.log(e)     //it triggers by pressing the enter key
//     if (e.which === 13 || e.krycode === 13) {
//       submitHandler();
//     }
//   };
//   return (
//     <Row className="login-page">
//       <Col className="login-form-left">
//         <img className="logo" src={logo} />
//         <div className="d-flex align-items-center justify-content-center">
//           <h1>Welcome to bodyslides</h1>
//         </div>
//         <div className="d-flex align-items-center justify-content-center">
//           <p>
//             Biggest massage oriented forums on the planet - user reviews,
//             Recommendations and discussion forums of massage parlours services &
//             entertainment
//           </p>
//         </div>
//         {/* <img src={designImag} className='left-side-design-img' /> */}
//       </Col>
//       <Col className="email-form-right auth-form">
//         <MDBCard>
//           <MDBCardBody>
//             <div className="auth-heading">Sign Up With bodyslides</div>
//             <div className="auth-description">
//               Enter your email address to receive <br />a verification link
//             </div>
//             <form className="form">
//               <MDBInput
//                 className=" input-filed"
//                 type="email"
//                 onChange={onChange}
//                 onKeyPress={handleKeypress}
//                 value={email}
//                 id="form1Example1"
//                 label="Email Address *"
//               />

//               {errors.email && <p className="errorText">{errors.email}</p>}
//               <br />

//               <MDBRow className="mb-4">
//                 <MDBCol className="d-flex justify-content-center"></MDBCol>
//               </MDBRow>
//               <p style={{ color: "#c8175d" }}>
//                 {varifyMessage && <>{varifyMessage}</>}
//               </p>
//               <MDBRow>
//                 <MDBCol md={3}> </MDBCol>

//                 <MDBCol md={6}>
//                   <MDBBtn
//                     type="button"
//                     className="auth-btn"
//                     onClick={submitHandler}
//                     block
//                   >
//                     Send
//                   </MDBBtn>
//                 </MDBCol>
//               </MDBRow>
//               {/* <div className='auth-btn'>
// 								<MDBBtn type='button' onClick={submitHandler} block>
// 									Send
// 								</MDBBtn>
// 							</div> */}
//               <br />
//               <MDBCol>
//                 <div className="login-btn-div">
//                   <NavLink to="/login" className="forgotpassword">
//                     Sign In to bodyslides
//                   </NavLink>
//                 </div>
//               </MDBCol>
//             </form>
//           </MDBCardBody>
//         </MDBCard>
//       </Col>
//     </Row>
//   );
// }
