import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import logo from "../assets/logo.png";
import "@fontsource/open-sans";
import "../css/loginPage.css";
import designImag from "../assets/left-login.png";
import eyeicon from "../assets/eyeicon.svg";
import eyeiconclose from "../assets/eyeicon-1.svg";
import TextField from "@mui/material/TextField";
import { loginApi } from "../axiosCalls";
import {
  MDBInput,
  MDBCol,
  MDBInputGroup,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Iconify from "../utils/Iconify";
import { IconButton, InputAdornment } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";

// import { MDBInput } from "../../node_modules/mdb-react-ui-kit";
export default function Login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showpassword, setfiledType] = useState(false);
  const [changeEyeIcon, seteyeIcon] = useState(true);

  const Show_password = (e) => {
    if (showpassword) {
      setfiledType(false);
      seteyeIcon(true);
    } else {
      setfiledType(true);
      seteyeIcon(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    setMessage("");
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    errors[e.target.name] = "";
  };
  const submitHandler = async () => {
    let errors = {};
    if (formValue.email) {
      const validEmail = new RegExp(
        `^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$`
      );
      if (!validEmail.test(formValue.email)) {
        errors["email"] = "Incorrect email";
      }
    }
    if (!formValue.email) {
      errors["email"] = "Email is required";
    }
    if (!formValue.password) {
      errors["password"] = "Password is required";
    }

    if (Object.keys(errors).length <= 0) {
      
      await loginApi(formValue.email, formValue.password).then((res) => {
      
        if (res.data.success) {
          localStorage.setItem("token", res.data.data.accessToken);
          localStorage.setItem("location", res.data.data.location);
          localStorage.setItem("userName", res.data.data.userName);
          localStorage.setItem("phoneNumber", res.data.data.phoneNumber);
          localStorage.setItem("email", res.data.data.email);
          localStorage.setItem("userID", res.data.data.id);
      

          const previousSpecficPage = localStorage.getItem("previousSpecficPage");          
          const previousPage = localStorage.getItem("previousPage");    
          const singleSpa = localStorage.getItem("singleSpa");        
          const isTrending = localStorage.getItem("isTrending");


          if (previousPage ==="/generic-thread" ) {
            localStorage.removeItem("previousPage");
            localStorage.removeItem("singleSpa");
            localStorage.removeItem("isTrending");
            navigate(previousPage,{ state: { singleSpa: JSON.parse(singleSpa), isTrending: isTrending } });
          }else if (previousPage==="/spa-thread"){
            const name = localStorage.getItem("name"); 
            const locationAddress = localStorage.getItem("locationAddress");
            const phoneNumber = localStorage.getItem("phoneNumber");
            localStorage.removeItem("name");
            localStorage.removeItem("locationAddress");
            localStorage.removeItem("phoneNumber");
            localStorage.removeItem("previousPage");
            navigate("/spa-thread", { state: { singleSpa: JSON.parse(singleSpa), name,locationAddress,phoneNumber } });

          } else if (previousPage==="/masseuse-thread"){
            const name = localStorage.getItem("name"); 
            const parantName = localStorage.getItem("parantName"); 
            const locationAddress = localStorage.getItem("locationAddress");
            const phoneNumber = localStorage.getItem("phoneNumber");
            localStorage.removeItem("name");
            localStorage.removeItem("locationAddress");
            localStorage.removeItem("phoneNumber");
            localStorage.removeItem("previousPage");
            localStorage.removeItem("parantName");
            navigate("/masseuse-thread", { state: { singleSpa: JSON.parse(singleSpa), name,locationAddress,phoneNumber,parantName } });

          } else if (previousPage ==="/advertisers"){
            localStorage.removeItem("previousPage");                 
            navigate(previousPage);
          }
          else{
            if(previousSpecficPage){
              localStorage.removeItem("previousSpecficPage");      
              localStorage.removeItem("singleSpa");    
              localStorage.removeItem("isTrending");  
              navigate(previousSpecficPage, { state: { singleSpa: JSON.parse(singleSpa), isTrending: isTrending } });                    
            }else{
            navigate("/");
            }
          }
          window.location.reload(true);
        } else {
          setMessage(res.data.message);
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
    <>
      <MDBRow className="login-page">
        <MDBCol md={6} className="login-form-left">
          <img className="logo" src={logo} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className="d-flex align-items-center justify-content-center">
            <h1>Welcome to bodyslides</h1>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <p>
              Biggest Massage Oriented Forums on the Planet - User Reviews,
              Recommendations and Discussion Forums of Massage Parlours Services
              & Entertainment
            </p>
          </div>
          {/* <img src={designImag} className="left-side-design-img" /> */}
        </MDBCol>
        <MDBCol md={6} className="login-form-right auth-form">
          <MDBCard>
            <MDBCardBody>
              <div className="auth-heading">Sign In With bodyslides</div>

              <div className="form">
                <TextField
                  label="Email Address"
                  type="email"
                  onKeyPress={handleKeypress}
                  id="validationCustom01"
                  className=" input-filed"
                  name="email"
                  onChange={onChange}
                  value={formValue.email}
                  style={{ width: "250px" }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        borderColor: "#C8175D",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#C8175D",
                        color: "red",
                      },
                    },
                    "& label.Mui-focused": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "#c8175d",
                      },
                    },
                  }}
                  size="small"
                />
                {errors.email && (
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      className="errorText"
                      // style={{ marginLeft: "-15px" }}
                    >
                      {errors.email}
                    </p>
                  </div>
                )}
                {!errors.email && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                <MDBInputGroup className="mb-3 passwordgroup">
                  <TextField
                    label="Password"
                    onKeyPress={handleKeypress}
                    id="validationCustom02"
                    className=" input-filed"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={onChange}
                    value={formValue.password}
                    style={{ width: "250px" }}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* <IconButton onClick={handleShowPassword} edge="end">
                            <Iconify
                              icon={
                                showPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            />
                          </IconButton> */}
                          <img
                            style={{ cursor: "pointer" }}
                            onClick={handleShowPassword}
                            src={showPassword ? eyeiconclose : eyeicon}
                            alt="eye icon"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": {
                          borderColor: "#C8175D",
                        },
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#C8175D",
                        },
                      },
                      "& label.Mui-focused": {
                        color: "black",
                      },
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#c8175d",
                        },
                      },
                    }}
                  />
                </MDBInputGroup>
                {errors.password && (
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      height: "17px",
                    }}
                  >
                    <p
                      className="errorText"
                      // style={{ marginLeft: "-15px" }}
                    >
                      {errors.password}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    height: "20px",
                  }}
                >
                  <NavLink
                    to="/forgot-password"
                    className="errorText"
                    style={{
                      textAlign: "right",
                      color: "#c8175d",
                      marginTop: !errors.password && "11px",
                    }}
                  >
                    Forgot Password?
                  </NavLink>
                </div>
                <br />
                <MDBRow>
                  <MDBCol md={3}></MDBCol>
                  <MDBCol md={6}>
                    <MDBBtn
                      type="button"
                      className="auth-btn"
                      onClick={submitHandler}
                      block
                    >
                      Sign In
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                {message ? (
                  <>
                    <MDBRow>
                      <div
                        style={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            color: "#c8175d",
                            fontWeight: 600,
                            paddingTop: "10px",
                            width: "249px",
                          }}
                        >
                          {message === "Invalid email or password" ? (
                            <>
                              Your email or password was incorrect. Try again or
                              click Forgot Password to reset it.
                            </>
                          ) : (
                            message
                          )}
                        </p>
                      </div>
                    </MDBRow>
                  </>
                ) : (
                  <br />
                )}
                <MDBCol>
                  <div className="login-btn-div">
                    <span>New to bodyslides? </span> &nbsp;{" "}
                    <a href="#" className="forgotpassword">
                      <NavLink to="/signup">Sign Up</NavLink>
                    </a>
                  </div>
                </MDBCol>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
