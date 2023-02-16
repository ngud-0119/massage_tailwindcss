import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "@fontsource/open-sans";
import "../css/loginPage.css";
import backicon from "../assets/back-icon.svg";
import designImag from "../assets/left-login.png";
import { forgotApi } from "../axiosCalls/auth";
import { toast } from "react-toastify";

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

// import { MDBInput } from "../../node_modules/mdb-react-ui-kit";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = async () => {
    let errors = {};
    if (email) {
      const validEmail = new RegExp(
        "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
      );
      console.log(validEmail.test(email));
      if (!validEmail.test(email)) {
        errors["email"] = "Incorrect email";
      }
    }
    if (!email) {
      errors["email"] = "Email is required";
    }
    if (Object.keys(errors).length <= 0) {
      await forgotApi(email)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            toast("Forgot Password Email sent", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            localStorage.setItem("forgotEmail", email);
            navigate("/verify-code");
          } else {
            setMessage("No user found with this email");
          }
        })
        .catch((err) => {
          setMessage("No user found with this email");
        });
    } else {
      setErrors(errors);
    }
  };
  const handleKeypress = (e) => {
    // console.log(e)     //it triggers by pressing the enter key
    if (e.which === 13 || e.krycode === 13) {
      submitHandler();
    }
  };
  return (
    <Row className="login-page">
      <Col className="login-form-left">
        <img className="logo" src={logo} />
        <div className="d-flex align-items-center justify-content-center">
          <h1>Welcome to bodyslides</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p>
            Biggest Massage Oriented Forums on the Planet - User Reviews,
            Recommendations and discussion forums of massage parlours services &
            entertainment
          </p>
        </div>
        {/* <img src={designImag} className='left-side-design-img' /> */}
      </Col>
      <Col className="email-form-right auth-form">
        <MDBCard>
          <span className="back-icon" onClick={() => navigate(-1)}>
            <img src={backicon} />
          </span>
          <div className="custom-cardBody">
            <div className="auth-heading ">Forgot Password</div>
            <div className="auth-description">
              {/* Enter your email address to receive
              <br />a password change link */}
            </div>

            <form className="form">
              <MDBInput
                className=" input-filed"
                type="email"
                onChange={onChange}
                onKeyPress={handleKeypress}
                value={email}
                id="form1Example1"
                label="Email Address *"
              />
              {errors.email && <p className="errorText">{errors.email}</p>}

              <MDBRow className="mb-4">
                <MDBCol className="d-flex justify-content-center"></MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={3}></MDBCol>
                <MDBCol md={6}>
                  <MDBBtn
                    type="button"
                    className="auth-btn"
                    onClick={submitHandler}
                    block
                  >
                    Send
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={12}>
                  {message && (
                    <>
                      <p
                        style={{
                          color: "red",
                          fontWeight: 600,
                          marginTop: "12px",
                        }}
                      >
                        {message}
                      </p>
                    </>
                  )}
                </MDBCol>
              </MDBRow>
              <br />
            </form>
          </div>
        </MDBCard>
      </Col>
    </Row>
  );
}
