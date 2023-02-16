import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo.png";
import "@fontsource/open-sans";
import "../css/loginPage.css";
import designImag from "../assets/left-login.png";
import eyeicon from "../assets/eyeicon.svg";
import eyeiconclose from "../assets/eyeicon-1.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInputGroup,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { signupApi, TokenVerify, updateProfile } from "../axiosCalls";
import { emailApi } from "../axiosCalls";
import { toast } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showpassword, setfiledType] = useState(false);
  const [showpasswordConfrim, setfiledTypeConfrim] = useState(false);
  const [changeEyeIcon, seteyeIcon] = useState(true);
  const [EyeIconConfrim, setEyeIconConfrim] = useState(true);
  const Show_password = (e) => {
    if (showpassword) {
      setfiledType(false);
      seteyeIcon(true);
    } else {
      setfiledType(true);
      seteyeIcon(false);
    }
  };
  const Show_password_confrim = (e) => {
    if (showpasswordConfrim) {
      setfiledTypeConfrim(false);
      setEyeIconConfrim(true);
    } else {
      setfiledTypeConfrim(true);
      setEyeIconConfrim(false);
    }
  };
  const [isAgree, setIsAgree] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    firstName: "",
    lastName: "",
    location: "",
    password: "",
    confrimPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    errors[e.target.name] = "";
  };
  const submitHandler = async () => {
    const { username, email, firstName, lastName, password, confrimPassword, location } =
      formValue;
    let errors = {};
    if (!username) {
      errors["username"] = "User Name is required";
    }
    if (!location) {
      errors["location"] = "Location is required";
    }
    if (!email) {
      errors["email"] = "Email is required";
    }
    if (email) {
      const validEmail = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
      );
      if (!validEmail.test(email)) {
        errors["email"] = "Incorrect email";
      }
    }
    if (!password) {
      errors["password"] = "Password is required";
    }
    if (!confrimPassword) {
      errors["confrimPassword"] = "Confirm Password is required";
    }
    if (password && confrimPassword) {
      if (!password.match(confrimPassword)) {
        errors["confrimPassword"] =
          "Confirm password and password doesn't match ";
      }
    }
    if (!isAgree) {
      errors["isAgree"] = "Please agree to terms and conditions ";
    }
    if (Object.keys(errors).length <= 0) {
      signupApi(username, password, email, location)
        .then((res) => {
          console.log(res);

          if (res.data.success) {
            setMessage(res.data.message);
          } else {
            setMessage(res.data.message);
          }

          setFormValue({
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            location: "",
            confrimPassword: "",
            email: "",
          });
        })
        .catch((err) => {
          console.log("Error block get executd", err);
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
  const handleCheckbox = () => {
    setIsAgree(!isAgree);
    errors["isAgree"] = "";
  };
  return (
    <Row className="login-page signup-page">
      <Col className="login-form-left">
        <img className="logo" src={logo} />
        <div className="d-flex align-items-center justify-content-center">
          <h1>Welcome to bodyslides</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p>
            Biggest Massage Oriented Forums on the Planet - user reviews,
            recommendations and discussion forums of massage parlours services &
            entertainment
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "17px",
            }}
          >
            Create your account to:
          </h3>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <ul style={{ width: "580px" }}>
            <li>
              <span>
                <FiberManualRecordIcon
                  style={{
                    fontSize: "19px",
                    paddingBottom: "4px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Find the best massage in town for you
            </li>
            <li>
              <span>
                <FiberManualRecordIcon
                  style={{
                    fontSize: "19px",
                    paddingBottom: "4px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Participate in massage discussions, review massage businesses and{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;masseuse profiles with
              community
            </li>
            <li>
              <span>
                <FiberManualRecordIcon
                  style={{
                    fontSize: "19px",
                    paddingBottom: "4px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Add your Massage Business listing to connect with more customers{" "}
            </li>
            <li>
              <span>
                <FiberManualRecordIcon
                  style={{
                    fontSize: "19px",
                    paddingBottom: "4px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Meet and chat with Masseuse about their services
            </li>
            <li>
              <span>
                <FiberManualRecordIcon
                  style={{
                    fontSize: "19px",
                    paddingBottom: "4px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Network with community members
            </li>
          </ul>
        </div>
        {/* <img src={designImag} className='left-side-design-img' /> */}
      </Col>
      <Col className="login-form-right auth-form">
        <MDBCard>
          <div className="custom-cardBody">
            <div className="auth-heading">Sign Up - It's Free!</div>
            <form className="form-signup">
              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  type="text"
                  name="email"
                  onChange={onChange}
                  onKeyPress={handleKeypress}
                  value={formValue.email}
                  id="validationCustom02"
                  required
                  label="Your email address"
                  style={{ width: "240px" }}
                ></MDBInput>
              </MDBInputGroup>

              {errors.email ? (
                <p className="errorText">{errors.email}</p>
              ) : (
                <br />
              )}

              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  className=" input-filed "
                  type="text"
                  name="username"
                  onChange={onChange}
                  onKeyPress={handleKeypress}
                  value={formValue.username}
                  id="form1Example1"
                  label="Desired username "
                >
                  {" "}
                </MDBInput>
              </MDBInputGroup>
              {errors.username ? (
                <p className="errorText">{errors.username}</p>
              ) : (
                <br />
              )}

              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  className=" input-filed "
                  type="text"
                  name="location"
                  onChange={onChange}
                  onKeyPress={handleKeypress}
                  value={formValue.location}
                  id="form1Example1"
                  label="Your Location"
                >
                  {" "}
                </MDBInput>
              </MDBInputGroup>
              {errors.username ? (
                <p className="errorText">{errors.location}</p>
              ) : (
                <br />
              )}

              {/* <MDBRow style={{ marginTop: 13, marginBottom: "-10px" }}>
                <MDBCol className="half-input">
                  <MDBInput
                    className="input-filed"
                    type="text"
                    name="firstName"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    value={formValue.firstName}
                    id="form1Example1"
                    label="First Name"
                  />
                  {errors.firstName && (
                    <p className="errorText">{errors.firstName}</p>
                  )}
                  <br />
                </MDBCol>
                <MDBCol className="half-input">
                  <MDBInput
                    className=" input-filed"
                    type="text"
                    name="lastName"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    value={formValue.lastName}
                    id="form1Example1"
                    label="Last Name"
                  />

                  {errors.lastName && (
                    <p className="errorText">{errors.lastName}</p>
                  )}
                  <br />
                </MDBCol>
              </MDBRow> */}

              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  type={showpassword ? "text" : "password"}
                  name="password"
                  onChange={onChange}
                  onKeyPress={handleKeypress}
                  value={formValue.password}
                  id="validationCustom02"
                  required
                  label="Password"
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

              {errors.password ? (
                <p className="errorText">{errors.password}</p>
              ) : (
                <br />
              )}

              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  type={showpasswordConfrim ? "text" : "password"}
                  name="confrimPassword"
                  onChange={onChange}
                  onKeyPress={handleKeypress}
                  value={formValue.confrimPassword}
                  id="validationCustom02"
                  required
                  label="Confirm Password "
                  style={{ width: "240px" }}
                >
                  {" "}
                  <img
                    className="eyeicon-pass"
                    onClick={() => Show_password_confrim()}
                    src={EyeIconConfrim ? eyeicon : eyeiconclose}
                  />
                </MDBInput>
              </MDBInputGroup>

              {errors.confrimPassword ? (
                <p className="errorText">{errors.confrimPassword}</p>
              ) : (
                <br />
              )}

              <MDBRow className="flex">
                {/* <MDBCol md={1} className=''> */}
                <div className="checkbox-width">
                  <MDBCheckbox
                    name="flexCheck"
                    value={isAgree}
                    onChange={handleCheckbox}
                    id="flexCheckDefault"
                    label=""
                  />
                </div>

                <div className="signup-terms ">
                  By continuing, you agree to body slides{" "}
                  <NavLink
                    to="/termsAndConditions"
                    target={"_blank"}
                    className="auth-links"
                  >
                    Terms of Services{" "}
                  </NavLink>
                  and{" "}
                  <NavLink
                    to="/privcyAndPolicy"

                    target={"_blank"}
                    className="auth-links"
                  >
                    Privacy Policy
                  </NavLink>
                  <span className="forgotpassword"> *</span>
                </div>
              </MDBRow>
              {errors.isAgree ? (
                <p className="errorText" style={{ marginLeft: "34px" }}>
                  {errors.isAgree}
                </p>
              ) : (
                <br />
              )}

              <MDBRow className="justify-center">
                <MDBCol md={6}>
                  <MDBBtn
                    type="button"
                    className="auth-btn-signup"
                    onClick={submitHandler}
                    block
                  >
                    Sign Up
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <br />
              <MDBCol>
                <div className="login-btn-div">
                  <NavLink to="/login" className="forgotpassword">
                    Already have an account? Sign in to bodySlides
                  </NavLink>
                </div>
              </MDBCol>
              <MDBRow className="justify-center">
                <MDBCol md={12}>
                  {message && (
                    <>
                      <p
                        style={{
                          marginTop: "11px",
                          color: "#c8175d",
                          fontWeight: 600,
                        }}
                      >
                        {message}
                      </p>
                    </>
                  )}
                </MDBCol>
              </MDBRow>
            </form>
          </div>
        </MDBCard>
      </Col>
    </Row>
  );
}


