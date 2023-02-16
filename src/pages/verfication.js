import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactCodeInput from "react-code-input";
import logo from "../assets/logo.png";
import "@fontsource/open-sans";
import "../css/loginPage.css";
import backicon from "../assets/back-icon.svg";
import designImag from "../assets/left-login.png";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { forgotApi } from "../axiosCalls/auth";

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
import { verifyCode } from "../axiosCalls";
import { toast } from "react-toastify";

// import { MDBInput } from "../../node_modules/mdb-react-ui-kit";
export default function Verification() {
  const [count, setCount] = useState(23);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [valid, setValid] = useState(true);
  const [error, setError] = useState();
  const [formValue, setFormValue] = useState({
    code_1: "",
    code_2: "",
    code_3: "",
    code_4: "",
  });
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const [emailer, setEmail] = useState("");
  const [verificationData, setVerificationData] = useState({
    email: "",
    code: 0,
  });

  console.log(verificationData.code.length);

  const handleValueInput = (e) => {
    setError("");
    setValid(true);
    if (String(e).replace(/[A-Za-z]/g, "").length === 4) {
      setVerificationData({ code: e, email: emailer.email });
    }
  };

  useEffect(() => {
    // increment the count by 1
    if (count > 0) {
      const countTimer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
        // every 1000 milliseconds
      }, 1000);

      // and clear this timer when the component is unmounted
      return function cleanup() {
        clearInterval(countTimer);
      };
    }
  });

  const resendAgain = async () => {
    const email = localStorage.getItem("forgotEmail");
    await forgotApi(email).then((res) => {
      toast(res.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  };

  const submitHandler = async () => {
    // navigate('/signup');
    console.log(verificationData.code);

    let email = localStorage.getItem("forgotEmail");

    if (verificationData.code < 4) {
      setError("Enter full varification code");
    }
    if (verificationData.code >= 4) {
      await verifyCode(email, verificationData.code)
        .then((res) => {
          if (res.data.success) {
            setValid(true);
            toast(res.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate("/reset-password");
          } else {
            setValid(false);
            toast.error("Invalid varification code", { theme: "colored" });
          }
        })
        .catch((err) => {
          setValid(false);
          toast.error("Invalid varification code", { theme: "colored" });
        });
    }
  };

  console.log(error);

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
          <MDBCardBody style={{ marginTop: "-40px" }}>
            <MDBCardTitle className="">Verification</MDBCardTitle>
            <MDBCardText style={{ fontWeight: 400, fontSize: "18px" }}>
              Please enter the verification code we <br />
              have sent to your email address to reset your password
            </MDBCardText>

            <form className="form">
              <MDBRow className="mb-4">
                <MDBCol className="d-flex justify-content-center">
                  <div className="verification">
                    <ReactCodeInput
                      name="resetPassword"
                      inputMode="numeric"
                      fields={4}
                      type="text"
                      onChange={(e) => handleValueInput(e)}
                      isValid={valid}
                    />
                  </div>{" "}
                  <br />
                  {/* <div className="verification">
                    <MDBInput
                      type="text"
                      name="code_1"
                      onChange={onChange}
                      maxLength="1"
                    ></MDBInput>
                    <MDBInput
                      type="text"
                      name="code_2"
                      onChange={onChange}
                      maxLength="1"
                    ></MDBInput>
                    <MDBInput
                      type="text"
                      name="code_3"
                      onChange={onChange}
                      maxLength="1"
                    ></MDBInput>
                    <MDBInput
                      type="text"
                      name="code_4"
                      onChange={onChange}
                      maxLength="1"
                    ></MDBInput>
                  </div> */}
                </MDBCol>
              </MDBRow>
              {error && (
                <p
                  style={{
                    color: "#e30022",
                    fontSize: "13px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    fontFamily: "Open Sans",
                  }}
                >
                  {error}
                </p>
              )}
              <div className="login-btn-div">
                <MDBBtn type="button" onClick={submitHandler}>
                  Verify
                </MDBBtn>
              </div>
              <br />

              <MDBCol>
                <div className="login-btn-div">
                  <span style={{ color: "black" }}>
                    Resend code in 00:{count}
                  </span>{" "}
                  &nbsp;{" "}
                  <a
                    href="#"
                    className="forgotpassword"
                    style={{
                      textDecoration: "underline",
                      pointerEvents: !count < 1 && "none",
                    }}
                    onClick={resendAgain}
                  >
                    Resend
                  </a>
                </div>
              </MDBCol>
            </form>
          </MDBCardBody>
        </MDBCard>
      </Col>
    </Row>
  );
}
