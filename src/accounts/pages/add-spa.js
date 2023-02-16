/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";
import "../css/edit-spa.module.css";
import imagePreview from "../../assets/bg-3.png";
import { InputTags } from "react-bootstrap-tagsinput";
import "../css/tags.css";
import "react-bootstrap-tagsinput/dist/index.css";
import ImageUploading from "react-images-uploading";
import { addSpa, getCities, uploadImages } from "../../axiosCalls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import add from "../../assets/icons/add.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { BallTriangle } from "react-loader-spinner";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import ImagePreview from "../ImagePreview";
import TimeDropdown from "../TimeDropdown";

export default function AddSpa() {
  const naviagte = useNavigate();
  const [tagState, setState] = useState();
  const [column, setColumn] = useState(0);
  const [disableTime, setdisableTime] = useState(false);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tags11, setTags11] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [isBlue, setIsblue] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fieldValue, setFieldValue] = useState(null);
  const [sizeMessage, setSizeMessage] = useState("");
  const [logourl, setLogourl] = useState();

  const [formValue, setFormValue] = useState({
    monfrom: "",
    monto: "",
    monstate: "true",
    tuefrom: "",
    tueto: "",
    tuestate: "true",
    wedfrom: "",
    wedto: "",
    wedstate: "true",
    thufrom: "",
    thuto: "",
    thustate: "true",
    frifrom: "",
    frito: "",
    fristate: "true",
    satfrom: "",
    satto: "",
    satstate: "true",
    sunfrom: "",
    sunto: "",
    sunstate: "true",
    spaName: "",
    spaLocation: "",
    spaCity: "",
    spaPhoneNo: "",
    spaEmail: "",
    spaWebsite: "",
    spaComment: "",
  });

  const [Allcity, setAllcity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getCities().then((res) => {
        setAllcity(res.data.data);
      });
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (logourl) {
      console.log(logourl);
      // let formData = new FormData(); //formdata object
      // formData.append("files", fieldValue);
      // uploadImages(formData)
      //   .then((res) => {
      //     console.log(res.data.data[0].img);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [logourl]);

  const onChange = (e) => {

    if (e.target.name === "monstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        monfrom: "",
        monto: "",
      });
    } else if (e.target.name === "tuestate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        tuefrom: "",
        tueto: "",
      });
    } else if (e.target.name === "wedstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        wedfrom: "",
        wedto: "",
      });
    } else if (e.target.name === "thustate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        thufrom: "",
        thuto: "",
      });
    } else if (e.target.name === "fristate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        frifrom: "",
        frito: "",
      });
    } else if (e.target.name === "satstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        satfrom: "",
        satto: "",
      });
    } else if (e.target.name === "sunstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        sunfrom: "",
        sunto: "",
      });
    } else {
      console.log("default else get excuted");

      if (e.target.name) {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
      } else {
        setFormValue({
          ...formValue,
          [e.target.getAttribute("name")]: e.target.textContent,
        });
      }
    }
  };

  console.log(formValue);

  // const ChangeTime = (e) => {
  //   console.log(e.target.textContent);
  //   console.log(e.target.getAttribute("name"));
  //   // setFormValue({ ...formValue, [name]: value });
  // };

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);
  const [check, setCheck] = useState(false);
  const maxNumber = 10; //maximum image upload
  // console.log(fieldValue);
  // console.log(images);
  const onChangeImage = (imageList) => {
    setImages(imageList);
    //   console.log(imageList)
  };

  const handleCancel = () => {
    naviagte("/account/spa");
  };

  const onSubmitHandle = () => {
    let errors = {};

    const timeTable = [
      {
        mon: {
          isOpen: formValue.monstate,
          from: formValue.monfrom,
          to: formValue.monto,
        },
      },
      {
        tue: {
          isOpen: formValue.tuestate,
          from: formValue.tuefrom,
          to: formValue.tueto,
        },
      },
      {
        wed: {
          isOpen: formValue.wedstate,
          from: formValue.wedfrom,
          to: formValue.wedto,
        },
      },
      {
        thu: {
          isOpen: formValue.thustate,
          from: formValue.thufrom,
          to: formValue.thuto,
        },
      },
      {
        fri: {
          isOpen: formValue.fristate,
          from: formValue.frifrom,
          to: formValue.frito,
        },
      },
      {
        sat: {
          isOpen: formValue.satstate,
          from: formValue.satfrom,
          to: formValue.satto,
        },
      },
      {
        sun: {
          isOpen: formValue.sunstate,
          from: formValue.sunfrom,
          to: formValue.sunto,
        },
      },
    ];

    if (!formValue.spaName) {
      errors["spaName"] = "Name is required";
    }

    console.log(formValue.monstate);

    // if (
    //   ((!formValue.monfrom || !formValue.monto) &&
    //     formValue.monstate === "true") ||
    //   ((!formValue.tuefrom || !formValue.tueto) &&
    //     formValue.tuestate === "true")
    // ) {
    //   console.log("==================>>>");
    //   errors["time"] = "All day & times is required";
    // }

    if (
      ((!formValue.monfrom || !formValue.monto) &&
        formValue.monstate === "true") ||
      ((!formValue.tuefrom || !formValue.tueto) &&
        formValue.tuestate === "true") ||
      ((!formValue.wedfrom || !formValue.wedto) &&
        formValue.wedstate === "true") ||
      ((!formValue.thufrom || !formValue.thuto) &&
        formValue.thustate === "true") ||
      ((!formValue.frifrom || !formValue.frito) &&
        formValue.fristate === "true") ||
      ((!formValue.satfrom || !formValue.satto) &&
        formValue.satstate === "true") ||
      ((!formValue.sunfrom || !formValue.sunto) &&
        formValue.sunstate === "true")
    ) {
      errors["time"] = "All day & times is required";
    }

    if (formValue.spaEmail) {
      const validEmail = new RegExp(
        `^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$`
      );
      if (!validEmail.test(formValue.spaEmail)) {
        errors["email"] = "Incorrect email";
      }
    }

    // if (!formValue.spaCity) {
    //   errors["spaCity"] = "City is required";
    // }

    if (!formValue.spaPhoneNo) {
      errors["spaPhoneNo"] = "Phone no is required";
    }

    // if (images.length == 0) {
    //   errors["images"] = "Image is required";
    // }

    if (!formValue.spaLocation) {
      errors["spaLocation"] = "Location is required";
    }

    // if (!formValue.spaWebsite) {
    //   errors["spaWebsite"] = "Website is required";
    // }

    // if (tags.length == 0) {
    //   errors["service"] = "Service is required";
    // }

    let locationSpa;
    if (!formValue.spaLocation) {
      errors["spaLocation)"] = "Location is required";
    } else {
      locationSpa = formValue.spaLocation;
    }
    let websiteSpa;
    if (!formValue.spaWebsite) {
      websiteSpa = null;
    } else {
      websiteSpa = formValue.spaWebsite;
    }
    let commentSpa;
    if (!formValue.spaComment) {
      commentSpa = null;
    } else {
      commentSpa = formValue.spaComment;
    }
    if (Object.keys(errors).length <= 0) {
      setCheck(true);

      if (images.length) {
        let formData = new FormData(); //formdata object
        images.map((img) => {
          formData.append("files", img.file);
        });

        uploadImages(formData)
          .then((res) => {
            console.log(res);

            if (res.data.success) {
              addSpa(
                formValue.spaName,
                res.data.data,
                formValue.spaPhoneNo,
                websiteSpa,
                timeTable,
                tags,
                formValue.spaCity,
                locationSpa,
                commentSpa,
                formValue.spaEmail,
                logourl
              ).then((responseSpa) => {
                console.log(responseSpa);
                if (responseSpa.data.success) {
                  toast(responseSpa.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setCheck(false);
                  // naviagte("/account/spa");
                }
              });
            } else {
              setCheck(false);
              console.log("image uploading isn't succcessed");
            }
            setCheck(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        addSpa(
          formValue.spaName,
          images,
          formValue.spaPhoneNo,
          websiteSpa,
          timeTable,
          tags,
          formValue.spaCity,
          locationSpa,
          commentSpa,
          formValue.spaEmail,
          logourl
        ).then((responseSpa) => {
          console.log(responseSpa);
          if (responseSpa.data.success) {
            toast(responseSpa.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setCheck(false);

            // naviagte("/account/spa");
          }
        });
      }
    } else {
      setCheck(false);
      setErrors(errors);
    }
  };
  const handleKeypress = (e) => {
    // console.log(e); //it triggers by pressing the enter key
    // if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
    //   onSubmitHandle();
    // }
  };

  let mystyle;
  if (check) {
    mystyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: "111111",
    };
  } else {
    mystyle = {
      display: "block",
    };
  }

  const onChangeTags = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      (key === "," || key === "Enter") &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    // if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
    //   const tagsCopy = [...tags];
    //   const poppedTag = tagsCopy.pop();
    //   e.preventDefault();
    //   setTags(tagsCopy);
    //   setInput(poppedTag);
    // }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const handleFocus = () => {
    setIsblue(true);
  };

  const handleFocusOut = () => {
    setIsblue(false);
    console.log("focus out");
  };

  // .test(
  // "FILE_SIZE",
  // "Uploaded file is too big.",
  // (value) => !value || (value && value.size <= 1024 * 1024)
  // ).test(
  // "FILE_FORMAT",
  // "Uploaded file has unsupported format.",
  // (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)
  // ))

  return (
    <>
      {check ? (
        <div style={mystyle}>
          <div className="ball-triangle-loading">
            <BallTriangle
              height={89}
              width={80}
              radius={5}
              color="#C8175D "
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <form action="">
        <div class="card card1" id="">
          <div class="card-body-to">
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <h5>
                    Business Name<span className="required-star">*</span>
                  </h5>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  <input
                    type="text"
                    class="form-control account-input"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaName"
                    required
                    placeholder="e.g. Oriental Wellness Spa"
                  />
                  {errors.spaName && (
                    <p className="errorText">{errors.spaName}</p>
                  )}
                </div>
              </div>

              <div class="container" id="customcontainer">
                <div class="row">
                  <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                    <h5>
                      Days & Times<span className="required-star">*</span>
                    </h5>
                  </div>

                  <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 timetable" >
                    <table class="table table-borderless" id="customtable1">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td class="day">Mon</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.monfrom}
                                state={formValue.monstate}
                                name="monfrom"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                onChange={onChange}
                                name="monfrom"
                                disabled={
                                  formValue.monstate === "Closed" ? true : false
                                }
                                value={formValue.monfrom}
                                // value={formValue.monstate === "Closed" && ""}
                                // value="08:56"
                                type="time"
                                id="1"
                              /> */}
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.monto}
                                state={formValue.monstate}
                                name="monto"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                onChange={onChange}
                                name="monto"
                                disabled={
                                  formValue.monstate === "Closed" ? true : false
                                }
                                type="time"
                                value={formValue.monto}
                                id="1"
                                placeholder="9:53"
                              /> */}
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                onChange={onChange}
                                name="monstate"
                                type="checkbox"
                                value={
                                  formValue.monstate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                id="1"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="day">Tue</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.tuefrom}
                                state={formValue.tuestate}
                                name="tuefrom"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                onChange={onChange}
                                name="tuefrom"
                                disabled={
                                  formValue.tuestate === "Closed" ? true : false
                                }
                                type="time"
                                value={formValue.tuefrom}
                                id="datetimepicker"
                                placeholder="9:53"
                              /> */}
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.tueto}
                                state={formValue.tuestate}
                                name="tueto"
                                ChangeTime={onChange}
                              />
                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                onChange={onChange}
                                value={formValue.tueto}
                                disabled={
                                  formValue.tuestate === "Closed" ? true : false
                                }
                                name="tueto"
                                id="datetimepicker1"
                                placeholder="9:53"
                              /> */}
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                onChange={onChange}
                                name="tuestate"
                                value={
                                  formValue.tuestate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label "
                                for="flexCheckDefault"
                              >
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="day">Wed</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.wedfrom}
                                state={formValue.wedstate}
                                name="wedfrom"
                                ChangeTime={onChange}
                              />
                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                onChange={onChange}
                                value={formValue.wedfrom}
                                disabled={
                                  formValue.wedstate === "Closed" ? true : false
                                }
                                name="wedfrom"
                                id="datetimepicker1"
                                placeholder="9:53"
                              /> */}
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.wedto}
                                state={formValue.wedstate}
                                name="wedto"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                id="datetimepicker1"
                                value={formValue.wedto}
                                onChange={onChange}
                                disabled={
                                  formValue.wedstate === "Closed" ? true : false
                                }
                                name="wedto"
                                placeholder="9:53"
                              /> */}
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={
                                  formValue.wedstate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                onChange={onChange}
                                name="wedstate"
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="day">Thu</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.thufrom}
                                state={formValue.thustate}
                                name="thufrom"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                disabled={
                                  formValue.thustate === "Closed" ? true : false
                                }
                                id="datetimepicker"
                                value={formValue.thufrom}
                                onChange={onChange}
                                name="thufrom"
                                placeholder="9:53"
                              /> */}
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.thuto}
                                state={formValue.thustate}
                                name="thuto"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                id="datetimepicker1"
                                value={formValue.thuto}
                                onChange={onChange}
                                disabled={
                                  formValue.thustate === "Closed" ? true : false
                                }
                                name="thuto"
                                placeholder="9:53"
                              /> */}
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={
                                  formValue.thustate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                id="flexCheckDefault"
                                onChange={onChange}
                                name="thustate"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="day">Fri</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.frifrom}
                                state={formValue.fristate}
                                name="frifrom"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                id="datetimepicker"
                                value={formValue.frifrom}
                                disabled={
                                  formValue.fristate === "Closed" ? true : false
                                }
                                placeholder="9:53"
                                onChange={onChange}
                                name="frifrom"
                              /> */}
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.frito}
                                state={formValue.fristate}
                                name="frito"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                id="datetimepicker1"
                                value={formValue.frito}
                                placeholder="9:53"
                                disabled={
                                  formValue.fristate === "Closed" ? true : false
                                }
                                onChange={onChange}
                                name="frito"
                              /> */}
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={
                                  formValue.fristate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                id="flexCheckDefault"
                                onChange={onChange}
                                name="fristate"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="day">Sat</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.satfrom}
                                state={formValue.satstate}
                                name="satfrom"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                id="datetimepicker"
                                value={formValue.satfrom}
                                placeholder="9:53"
                                disabled={
                                  formValue.satstate === "Closed" ? true : false
                                }
                                onChange={onChange}
                                name="satfrom"
                              /> */}
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.satto}
                                state={formValue.satstate}
                                name="satto"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                id="datetimepicker1"
                                value={formValue.satto}
                                disabled={
                                  formValue.satstate === "Closed" ? true : false
                                }
                                placeholder="9:53"
                                onChange={onChange}
                                name="satto"
                              /> */}
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={
                                  formValue.satstate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                id="flexCheckDefault"
                                onChange={onChange}
                                name="satstate"
                              />
                              <label
                                class="form-check-label "
                                for="flexCheckDefault"
                              >
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="day">Sun</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.sunfrom}
                                state={formValue.sunstate}
                                name="sunfrom"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                disabled={
                                  formValue.sunstate === "Closed" ? true : false
                                }
                                id="datetimepicker"
                                value={formValue.sunfrom}
                                placeholder="9:53"
                                onChange={onChange}
                                name="sunfrom"
                              /> */}
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.sunto}
                                state={formValue.sunstate}
                                name="sunto"
                                ChangeTime={onChange}
                              />

                              {/* <input
                                class="form-control datetimepicker"
                                type="time"
                                id="datetimepicker1"
                                disabled={
                                  formValue.sunstate === "Closed" ? true : false
                                }
                                placeholder="9:53"
                                onChange={onChange}
                                value={formValue.sunto}
                                name="sunto"
                              /> */}
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={
                                  formValue.sunstate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                id="flexCheckDefault"
                                onChange={onChange}
                                name="sunstate"
                              />
                              <label
                                class="form-check-label "
                                for="flexCheckDefault"
                              >
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {errors.time && <p className="errorText">{errors.time}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>
                      Location Address<span className="required-star">*</span>
                    </h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  <input
                    type="text"
                    class="form-control account-input"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaLocation"
                    id="inputlocation"
                    placeholder=""
                  />
                  {errors.spaLocation && (
                    <p className="errorText">{errors.spaLocation}</p>
                  )}
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 ">
                  <label for="Location">
                    <h5>
                      Phone Number<span className="required-star">*</span>
                    </h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  <input
                    type="text"
                    required
                    class="form-control account-input"
                    onChange={onChange}
                    // onKeyPress={handleKeypress}
                    name="spaPhoneNo"
                    id="inputphone"
                    placeholder="e.g. 647-555-8888"
                  />
                  {errors.spaPhoneNo && (
                    <p className="errorText">{errors.spaPhoneNo}</p>
                  )}
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Business Profile Picture</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <Stack
                    direction="row"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItem: "center",
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      name="file"
                      onChange={(event) => {
                        setFieldValue(event.target.files[0]);
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {fieldValue && (
                        <ImagePreview
                          file={fieldValue}
                          sizeMessage={sizeMessage}
                          setSizeMessage={setSizeMessage}
                          fieldValue={fieldValue}
                          setLogourl={setLogourl}
                        />
                      )}
                      <button
                        onClick={() => {
                          fileRef.current.click();
                        }}
                        style={{
                          width: "113px",
                          border: "none",
                          fontStyle: "normal",
                          fontFamily: "Open Sans",
                          lineHeight: "26px",
                          borderRadius: "17px",
                          height: "39px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        type="button"
                      >
                        Upload
                      </button>
                    </div>
                  </Stack>
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Email">
                    <h5>Business Email</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  <input
                    type="text"
                    class="form-control account-input"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaEmail"
                    id="inputlocation"
                  // placeholder="e.g. bslidesbot@gmail.com"
                  />
                  {errors.email && <p className="errorText">{errors.email}</p>}
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5 style={{ paddingTop: "20px" }}>Images</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  <ImageUploading
                    multiple
                    maxFileSize={5 * 1024 * 1024}
                    value={images}
                    onChange={onChangeImage}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                      errors,
                    }) => (
                      <div
                        className="upload__image-wrapper row images-input
                      "
                        // row-cols-6
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* {console.log(column)} */}

                        {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                        {imageList.map((image, index) => (
                          <div key={index} className="" alt={setColumn(index)}>
                            {/* col */}
                            <div>
                              <button
                                type="button"
                                onClick={() => onImageUpdate(index)}
                                style={{
                                  background: "none",
                                  color: "inherit",
                                  border: "none",
                                  padding: 0,
                                  font: "inherit",
                                  cursor: "pointer",
                                  outline: "inherit",
                                }}
                              >
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  id={index}
                                  width="100px"
                                  height="100px"
                                  style={{
                                    background: `url(${imagePreview})`,
                                    // padding: "5px",
                                    maxWidth: "none",
                                  }}
                                />
                              </button>
                              <div
                                style={{
                                  marginTop: "-20px",
                                  marginLeft: "-73px",
                                }}
                              >
                                <button
                                  type="button"
                                  style={{
                                    background: "none",
                                    color: "inherit",
                                    border: "none",
                                    padding: 0,
                                    font: "inherit",
                                    cursor: "pointer",
                                    outline: "inherit",
                                  }}
                                  onClick={() => onImageRemove(index)}
                                >
                                  <CancelIcon style={{ color: "#C8175D" }} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          style={
                            (isDragging ? { color: "red" } : undefined,
                            {
                              height: "100px",
                              width: "100px",
                              backgroundColor: "white",
                              border: "1px solid #EBEBEB",
                              borderRadius: "5px",
                              marginLeft:
                                images?.length > 0 && images?.length != 10
                                  ? "13px"
                                  : "auto",
                              // marginLeft: "auto",
                              marginRight:
                                images?.length > 0 && images?.length != 10
                                  ? ""
                                  : "auto",
                            })
                          }
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <img src={add} width="40" height="40" alt="add img" />
                        </button>
                        {errors?.maxNumber && (
                          <span style={{ color: "#c01c5b", marginTop: "13px" }}>
                            Number of selected images exceed maxNumber
                          </span>
                        )}
                        {errors?.maxFileSize && (
                          <span style={{ color: "#c01c5b", marginTop: "13px" }}>
                            Selected file size exceed maxFileSize
                          </span>
                        )}
                      </div>
                    )}
                  </ImageUploading>
                  {errors.images && (
                    <p className="errorText">{errors.images}</p>
                  )}
                  <div class="ml-2 col-sm-6">
                    <div id="msg"></div>

                    {/* <form method="post" id="image-form">
                         
                                <input type="file" name="img[]" class="file" accept="image/*" />                      
                            </form> */}
                  </div>
                  <div class="ml-2 col-sm-6">
                    {/* <img
                    src={imagePreview}
                    id="preview"
                    class="img-thumbnail"
                    width="100px"
                  /> */}
                  </div>
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>City</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  {/* <select
                    class="form-control"
                    id="inputlocation"
                    name="spaCity"
                    onKeyPress={handleKeypress}
                    required
                    onChange={onChange}
                  >
                    <option value="">Select City</option>
                    {Allcity.map((city) => {
                      return <option value={city.id}>{city.name}</option>;
                    })}
                  </select> */}

                  <input
                    type="text"
                    required
                    class="form-control account-input"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaCity"
                    id="inputlocation"
                    placeholder="e.g. Toronto"
                  />

                  {errors.spaCity && (
                    <p className="errorText">{errors.spaCity}</p>
                  )}
                </div>

                <div
                  class="container"
                  id="customclassforcontainer"
                  style={{ marginTop: "8px" }}
                ></div>
              </div>
            </div>
            <div
              class="container"
              id="customclassforcontainer"
              style={{ marginTop: "-7px" }}
            >
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Services</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  <div
                    style={{
                      display: "flex",
                      // overflow: "scroll",
                      width: "100%",
                      maxWidth: "100%",
                      paddingLeft: "14px",
                      border: "2px #bdbdbd solid",
                      borderRadius: "5px",
                      color: "black",
                      flexWrap: "wrap",
                    }}
                    className="tagContainer account-input"
                  >
                    {tags.map((tag, index) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "7px 0",
                          marginRight: "10px",
                          padding: "0 10px",
                          paddingRight: "5px",
                          border: "1px solid #c8175d",
                          borderRadius: "18px",
                          backgroundColor: "unset",
                          whiteSpace: "nowrap",
                          color: "#4f4f4f",
                          fontWeight: 400,
                          fontSize: "15px",
                          height: "32px",
                          lineHeight: "26px",
                          fontFamily: "Open Sans",
                        }}
                      >
                        {tag}
                        <button
                          style={{
                            display: "flex",

                            border: "none",

                            borderRadius: "50%",
                            // backgroundColor: "unset",
                            cursor: "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "14px",
                            marginLeft: "4px",
                            backgroundColor: "rgb(200, 23, 93)",
                            height: "19px",
                            width: "19px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => deleteTag(index)}
                          type="button"
                        >
                          x
                        </button>
                      </div>
                    ))}
                    <input
                      style={{
                        width: "100%",
                        minWidth: "50%",
                        border: "none",
                        borderRadius: "5px",
                        height: "37px",
                      }}
                      value={input}
                      placeholder="e.g. Soft Massage"
                      onKeyDown={onKeyDown}
                      onKeyUp={onKeyUp}
                      onChange={onChangeTags}
                    />
                  </div>
                  {errors.service && (
                    <p className="errorText">{errors.service}</p>
                  )}
                  {/* <input name='tags' type='text' value='Face Massage, Feet Massage' class="form-control"
                                            autofocus /> */}
                  {/* <!-- <textarea class="form-control" placeholder="Leave a comment here"
                                        id="floatingTextarea2" style="height: 100px" data-role="tagsinput"></textarea> --> */}
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>
                      Website
                      {/* <span className="required-star">*</span> */}
                    </h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 account-input-parant">
                  <input
                    type="text"
                    required
                    class="form-control account-input"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaWebsite"
                    id=""
                  />

                  {errors.spaWebsite && (
                    <p className="errorText">{errors.spaWebsite}</p>
                  )}
                </div>
              </div>

              <div
                class="container"
                id="customclassforcontainer"
                style={{ marginTop: "11px" }}
              >
                <div class="row">
                  <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                    <label for="Location">
                      <h5 style={{ marginRight: "39px" }}>
                        Additional Information
                      </h5>
                    </label>
                  </div>
                  <div
                    class="col-lg-8 col-sm-12 col-xs-12 col-md-12"
                    style={{ width: "71%", marginLeft: "-11px", }}
                    className="textarea-input"
                  >
                    <textarea
                      class="form-control"
                      placeholder="Introduce your business, add any information you'd like for people to know about business"
                      onChange={onChange}
                      name="spaComment"
                      onKeyPress={handleKeypress}
                      id="floatingTextarea2"
                      style={{ height: "100px", width: "100%", border: "1px solid #bdbdbd" }}
                      data-role="tagsinput"
                      className="account-input"

                    ></textarea>
                  </div>
                </div>

                <button
                  class="button22 btn-small-screen"
                  type="button"
                  onClick={onSubmitHandle}
                  style={{ float: "right", marginTop: "20px" }}
                >
                  Save
                </button>
                <button
                  class="button111 btn-small-screen"
                  type="button"
                  style={{ float: "right", marginTop: "20px" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </form>
    </>
  );
}
