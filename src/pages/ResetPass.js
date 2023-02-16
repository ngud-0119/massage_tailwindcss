import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo.png";
import "@fontsource/open-sans";
import backicon from "../assets/back-icon.svg";
import eyeicon from "../assets/eyeicon.svg";
import eyeiconclose from "../assets/eyeicon-1.svg";

import "../css/loginPage.css";
import designImag from "../assets/left-login.png";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBInputGroup,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import { updatePassword } from "../axiosCalls";
import { toast } from "react-toastify";

// import { MDBInput } from "../../node_modules/mdb-react-ui-kit";
export default function ResetPass() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setfiledType] = useState(false);
  const [showConfrimPassword, setfiledTypeConfrim] = useState(false);
  const [changeEyeIcon, seteyeIcon] = useState(true);
  const [confrimEyeIcon, setConfrimEyeIcon] = useState(true);
  const Show_password = (e) => {
    if (showpassword) {
      setfiledType(false);
      seteyeIcon(false);
    } else {
      setfiledType(true);
      seteyeIcon(true);
    }
  };
  const Show_password_confrim = (e) => {
    if (showConfrimPassword) {
      setfiledTypeConfrim(false);
      setConfrimEyeIcon(false);
    } else {
      setfiledTypeConfrim(true);
      setConfrimEyeIcon(true);
    }
  };
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const submitHandler = async () => {
    let errors = {};

    if (!formValue.confirmpassword) {
      errors["confirmpassword"] = "Password is required";
    }
    if (!formValue.password) {
      errors["password"] = "Password is required";
    }
    if (
      formValue.password != formValue.confirmpassword &&
      formValue.password &&
      formValue.confirmpassword
    ) {
      errors["confirmpassword"] =
        "Confirm password and New password doesn't match ";
      errors["password"] = "Confirm password and New password doesn't match ";
    }

    if (Object.keys(errors).length <= 0) {
      // navigate('/');

      let email = localStorage.getItem("forgotEmail");
      await updatePassword(email, formValue.password).then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
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

          navigate("/");
        }
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
      <Col className="login-form-right">
        <MDBCard>
          <span className="back-icon" onClick={() => navigate(-1)}>
            <img src={backicon} />
          </span>

          <div className="custom-cardBody">
            <div className="auth-heading">Reset Password</div>
            <div className="auth-description">Enter your new password</div>
            <div className="form">
              {/* <MDBValidation>
								<MDBValidationItem> */}

              {/* <MDBValidationItem> */}
              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  type={showpassword ? "text" : "password"}
                  name="password"
                  onChange={onChange}
                  onKeyPress={handleKeypress}
                  value={formValue.password}
                  id="validationCustom02"
                  required
                  label="New Password *"
                  style={{ width: "240px" }}
                >
                  {" "}
                  <img
                    className="eyeicon-pass"
                    onClick={() => Show_password()}
                    src={changeEyeIcon ? eyeicon : eyeiconclose}
                  />
                </MDBInput>
              </MDBInputGroup>
              {errors.password && (
                <p className="errorText">{errors.password}</p>
              )}
              <br />
              {/* </MDBValidationItem> */}
              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  type={showConfrimPassword ? "text" : "password"}
                  name="confirmpassword"
                  onChange={onChange}
                  onKeyPress={handleKeypress}
                  value={formValue.confirmpassword}
                  id="validationCustom02"
                  required
                  label="Confirm Password *"
                  style={{ width: "240px" }}
                >
                  {" "}
                  <img
                    className="eyeicon-pass"
                    onClick={() => Show_password_confrim()}
                    src={confrimEyeIcon ? eyeicon : eyeiconclose}
                  />
                </MDBInput>
              </MDBInputGroup>

              {errors.password && (
                <p className="errorText">{errors.confirmpassword}</p>
              )}
              <MDBRow className="mb-4">
                <MDBCol className="d-flex justify-content-center"></MDBCol>
                <MDBCol></MDBCol>
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
                    Save
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              {/* <div className='login-btn-div'>
								<MDBBtn type='button' onClick={submitHandler} block>
									Save
								</MDBBtn>
							</div> */}

              <MDBCol></MDBCol>
              {/* </MDBValidation> */}
            </div>
          </div>
        </MDBCard>
      </Col>
    </Row>
  );
}
