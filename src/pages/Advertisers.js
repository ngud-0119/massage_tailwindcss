import React, { useState, useEffect, useContext } from "react";
import { isLogin } from "../utils/isLogins";
import sendIcon from "../assets/sendIcon.svg";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBTextArea,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import "../css/advertise.css";

import "../accounts/css/edit-spa.module.css";
import imagePreview from "../assets/bg-3.png";
import CheckboxFill from "../assets/images/fill-checkbox.png";
import CheckboxEmpty from "../assets/images/empty-checkbox.png";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import ImageUploading from "react-images-uploading";
import { sendAdvertisementData } from "../axiosCalls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import add from "../assets/icons/add.png";
import CancelIcon from "@mui/icons-material/Cancel";
import "../css/advertise.css"
import { getDimensions } from "../utils/getWindowDimension"
import { textAlign } from "@mui/system";
import { Context } from "../context/dataContext";
export default function Advertisers() {
  const naviagte = useNavigate();
  const [currentWidth, setCurrentWidth] = useState();
  const [currentHeight, setCurrentHeight] = useState();
  const { setIsSearchPage } = useContext(Context);
  const initialState = {
    name: "",
    email: "",
    target_url: "",
  }

  window.addEventListener("resize", () => getDimensions(setCurrentWidth, setCurrentHeight));

  useEffect(() => {
    getDimensions(setCurrentWidth, setCurrentHeight)
  }, [])

  const [bannerFile, setBannerFile] = useState(null);
  const [advertiseFormValue, setAdvertiseFormValue] = useState(initialState);

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const onChange = (e) => {
    setAdvertiseFormValue({ ...advertiseFormValue, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});

  const submitAdvertiseRequest = () => {
    let errors = {};
    const fileSize = bannerFile?.size / 1024 / 1024
    if (fileSize > 10) {
      errors["bannerFile"] = "File size should less then 10mb";
    } else {
      if (!advertiseFormValue.name) {
        errors["name"] = "Name is required";
      }
      if (!advertiseFormValue.email) {
        errors["email"] = "Email is required";
      }
      if (!bannerFile) {
        errors["bannerFile"] = "Banner file is required";
      }
      if (!advertiseFormValue.target_url) {
        errors["targetUrl"] = "Target Url is required";
      }
    }
    if (Object.keys(errors).length <= 0) {

      let formData = new FormData();
      formData.append("business", advertiseFormValue.name);
      formData.append("email", "mi477048@gmail.com");
      formData.append("fileurl", "www.google.com");
      formData.append("atu", advertiseFormValue.target_url);
      formData.append("sampleFile", bannerFile);
      formData.append("loginemail", advertiseFormValue.email);

      sendAdvertisementData(formData).then((res) => {
        if (res.status === 200) {
          toggleShow();
        } else {
          console.log("file size not supported")
        }
        setAdvertiseFormValue(initialState)
      }).catch(err => {
        console.log(err)
      });

    } else {
      setErrors(errors);
    }
  };

  const handleCreatePost = () => {
    if (isLogin()) {
      submitAdvertiseRequest()
    } else {
      localStorage.setItem("previousPage", window.location.pathname);     
      naviagte("/login");
    }
  };

  if (bannerFile) {
    let formData = new FormData();
    formData.append("files", bannerFile);
    console.log(bannerFile.size / 1024 / 1024)
  }
  useEffect(() => {

    setIsSearchPage(false)

  }, []);

  return (
    <>
      <div style={{ paddingTop: currentWidth > 600 ? "140px" : "50px", backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontFamily: "Open Sans",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "44px",
                letterSpacing: "0em",
                color: "#C8175D",

              }}
            >
              Advertise With Us
            </h3>
            <br />
            <p
              style={{
                fontFamily: "Open Sans",
                fontSize: "19.16px",
                fontWeight: 400,
                lineHeight: "26.1px",
                padding: "0px 23px"
              }}
            >
              Help people get to know you
            </p>{" "}
            {currentWidth > 600 && <>
              {/* <br /> */}
            </>}

          </div>
        </div>



        <div>
          <div
            class="card-advertiser"
            style={{ paddingBottom:"0px" }}
          >
            <div className="row" style={{ 
              // backgroundColor: "yellow",    
              border: "1px solid black", marginLeft: "0px", height: "3rem", width: "100%" }}>
              <div class="col-sm-5 col-xs-5 card-header-subContainer">
                <h5 style={{ color: "black" }}>
                  Package
                </h5>
              </div>
              <div class="col-sm-2 col-xs-2 card-header-subContainer">
                <h5 style={{ color: "black" }}>
                  Type
                </h5>
              </div>
              <div class="col-sm-2 col-xs-2 card-header-subContainer">
                <h5 style={{ color: "black" }}>
                  Cost
                </h5>
              </div>
              <div class="col-sm-3 col-xs-3 card-header-subContainer">
                <h5 style={{ color: "black" }}>
                  Empty Slots
                </h5>
              </div>
            </div>
            


            <div className="row" style={{ 
              backgroundColor: "rgb(192, 28, 91)", 
              marginLeft: "0px", width: "100%",borderLeft: "1px solid black",borderRight: "1px solid black" }}>
              <div class="col-sm-5 col-xs-5 card-header-subContainer">
                <h5 style={{ color: "black",padding: 0,
                   marginRight: 0,
                   marginLeft: 0,
                   marginTop: "10px",
                   marginBottom: "10px",
                   fontSize: "19px" }}>
                  Large Rectangle 300x250 
                  <p style={{fontSize:"16px"}}>This is a large ad you see at the top of the every page of the Forum</p>
                </h5> 
              </div>
              <div class="col-sm-2 col-xs-2 card-header-subContainer">
                <h5 style={{ color: "black", fontSize: "19px" }}>
                  Banner
                </h5>
              </div>
              <div class="col-sm-2 col-xs-2 card-header-subContainer">
                <h5 style={{ color: "black", fontSize: "19px" }}>
                  $300.00 / Month
                </h5>
              </div>
              <div class="col-sm-3 col-xs-3 card-header-subContainer">
                <h5 style={{ color: "black", fontSize: "19px" }}>
                  36
                </h5>
              </div>
            </div>

            <div className="row" style={{ 
              backgroundColor: "rgb(192, 28, 91)",
               marginLeft: "0px", width: "100%",border: "1px solid black" }}>
              <div class="col-sm-5 col-xs-5 card-header-subContainer">
                <h5 style={{ color: "black",padding: 0,
                   marginRight: 0,
                   marginLeft: 0,
                   marginTop: "10px",
                   marginBottom: "10px",
                   fontSize: "19px" }}>
                  Small Rectangle 250x260 
                  <p style={{fontSize:"16px"}}>This is a small Rectangle Ads you see at the top of the every page of the Forum 250x260 px size</p>
                </h5> 
              </div>
              <div class="col-sm-2 col-xs-2 card-header-subContainer">
                <h5 style={{ color: "black", fontSize: "19px" }}>
                  Banner
                </h5>
              </div>
              <div class="col-sm-2 col-xs-2 card-header-subContainer">
                <h5 style={{ color: "black", fontSize: "19px" }}>
                  $150.00 / Month
                </h5>
              </div>
              <div class="col-sm-3 col-xs-3 card-header-subContainer">
                <h5 style={{ color: "black", fontSize: "19px" }}>
                  94
                </h5>
              </div>
            </div>

          </div>

          {currentWidth > 600 && <>
            <br />
            {/* <br /> */}
          </>}
          <form action="">
            <div
              class="card-advertiser"
            >
              <div class="card-body-to">
                <div class="container" id="customclassforcontainer">
                  <div class="row">
                    <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                      <h5 style={{ color: "black" }}>
                        Business Name<span className="required-star">*</span>
                      </h5>
                    </div>
                    <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                      <input
                        type="text"
                        class="form-control"
                        onChange={onChange}
                        name="name"
                        placeholder=""
                        value={advertiseFormValue.name}
                        required
                      />
                      {errors.name && (
                        <p className="errorText">{errors.name}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div class="container" id="customclassforcontainer">
                  <div class="row">
                    <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                      <label for="Location">
                        <h5>
                          Email<span className="required-star">*</span>
                        </h5>
                      </label>
                    </div>
                    <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                      <input
                        type="text"
                        class="form-control"
                        onChange={onChange}
                        name="email"
                        id="inputlocation"
                        value={advertiseFormValue.email}
                        placeholder=""
                      />
                      {errors.email && (
                        <p className="errorText">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div class="container" id="customclassforcontainer" >
                  <div class="row">
                    <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                      <label for="Location">
                        <h5>
                          Banner Ad file<span className="required-star">*</span>
                        </h5>
                      </label>
                    </div>
                    <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12" >
                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                      }}>
                        <input
                          // style={{ width: "100%" }}
                          type="file"
                          name="file"
                          onChange={(event) => { setBannerFile(event.target.files[0]) }}
                        />
                        {errors.bannerFile && (
                          <p className="errorText" style={{ textAlign: "center", width: "100%" }}>{errors.bannerFile}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container" id="customclassforcontainer">
                  <div class="row">
                    <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                      <label for="Location">
                        <h5>
                          Advertisement Target URL
                          <span className="required-star">*</span>
                        </h5>
                      </label>
                    </div>
                    <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        onChange={onChange}
                        name="target_url"
                        value={advertiseFormValue.target_url}
                      />
                      {errors.targetUrl && (
                        <p className="errorText">{errors.targetUrl}</p>
                      )}
                    </div>
                  </div>

                  <div class="container adrequest" id="customclassforcontainer" >
                    <button
                      type="button"
                      onClick={handleCreatePost}
                      className="submitRequest"
                    >
                      Submit Ad Request
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
            <br />
            <br />
          </form>
        </div>
      </div>
      {/* Model */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog className="send-model">
          <MDBModalContent>
            <span className="close-button">
              <MDBBtn
                className="btn-close model-close-btn"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </span>

            <MDBModalBody
              style={{
                padding: "10%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <img src={sendIcon} style={{}} />
              <br />
              <h3 className="email-send-popup-text">Sent</h3>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
