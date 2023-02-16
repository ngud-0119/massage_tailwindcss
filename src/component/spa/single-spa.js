import React, { useEffect, useState, useRef } from "react";
import "../../css/signle-spa.css";
import heroBg from "../../assets/hero-bg.png";
import bg3 from "../../assets/spa-bannerbg.png";
import rightImg from "../../assets/overlay-spa-still-life-with-beauty-products1.png";
import spaProfile from "../../assets/spaprofile.svg";
import locationIcon from "../../assets/location-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import worldIcon from "../../assets/map-icon.svg";
import timeIcon from "../../assets/time-icon.svg";
import { baseUrl } from "../../utils/isLogins";
import { Icon } from "@iconify/react";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { NavLink, useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import "../../css/single-page.css"
import { ScrollTo } from "react-scroll-to";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBBtn,
} from "mdb-react-ui-kit";
import Gallery from "../sections/gallery";
import SingleMostRecentSpaDiscussion from "./single-most-recent-spa-discussions";
import SingleSpaDiscussionReviews from "./single-spa-discussion-reviews";
import { getsingalSpa, spaChildId, getsingalMasseuse } from "../../axiosCalls";
import { useLocation } from "react-router-dom";
export default function SingleSpa() {
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= spa[0]?.image?.length) {
      setLoading(false);
    }
  };
  const url = baseUrl();
  const navigate = useNavigate();
  const myRef = useRef();
  const [spa, setspa] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [massuseId, setMassuseId] = useState();
  const [spaChilds, setSpaChilds] = useState();
  const search = useLocation().search;
  const location = useLocation();
  const spaid = new URLSearchParams(search).get("id");

  useEffect(() => {
    const fetchSpa = async () => {
      await getsingalSpa(spaid).then((res) => {
        console.log(res);
        setspa(res.data.data);
      });

      // myRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    };
    const fetchStaffChildId = async () => {
      await spaChildId(spaid).then((res) => {
        setMassuseId(res?.data?.data[0]?.masseuseId);
        getsingalMasseuse(res?.data?.data[0]?.masseuseId).then((res) => {
          setSpaChilds(res.data.data[0].name);
        });
      });
    };

    fetchSpa();
    fetchStaffChildId();
  }, []);
  const formatTime = (timeString) => {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  console.log(spa[0]?.spaMessauses);

  const handleComment = (value) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  };

  const handlePhoneClick = (phoneNUmber) =>{
    window.location.href = `tel:${phoneNUmber}`;
  }

  return (
    <>
      {spa?.length == 0 ? (
        <div style={{ paddingTop: "71vh" }}></div>
      ) : (
        <>
          <div
            className="hero-section section overlay"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="bg-single-spa">
              <div className="row main-row-adv">
                <div className=" left-side" style={{ padding: "5% 1% 1% 5%" }}>
                  <MDBBreadcrumb>
                    <MDBBreadcrumbItem className="breadcrumb-item-text">
                      <a href="/spa">Spa</a>
                    </MDBBreadcrumbItem>

                    <MDBBreadcrumbItem className="breadcurm-active">
                      {spa[0]?.name}
                    </MDBBreadcrumbItem>
                  </MDBBreadcrumb>

                  <MDBListGroup>
                    <MDBListGroupItem tag="label">
                      <div className="row">
                        {/* <div style={{ width: "124px" }}>
                          {spa[0].logo ? (
                            <>
                              <img
                                src={`${url}/files/${spa[0]?.logo}`}
                                style={{
                                  // width: "100px",
                                  height: "87px",
                                  // objectFit: "cover",
                                  // borderRadius: "50%",
                                }}
                                alt="Logo"
                              />
                            </>
                          ) : (
                            <img
                              src={spaProfile}
                              style={{
                                // width: "100px",
                                height: "87px",
                                // borderRadius: "50%",
                              }}
                              alt="Logo"
                            />
                          )}
                        </div> */}

                        <div className="col-md-12">
                          <MDBCardTitle className="signle-spa-main-title">
                            {" "}
                            {spa[0]?.name}
                          </MDBCardTitle>
                          {/* <MDBCardSubTitle className="signle-spa-main-subtitle">
                            ({spa[0]?.services.length}+ services Available)
                          </MDBCardSubTitle> */}
                        </div>
                      </div>
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <div className="row singleSpa-info" style={{ marginTop: "20px" }} >
                    <div className="col-md-3">
                      <MDBListGroup>
                        {spa[0]?.location && (
                          <>
                            <MDBListGroupItem tag="label">
                              <img src={locationIcon} alt="..." />{" "}
                              <a
                                href={
                                  "https://www.google.com/maps/place/" +
                                  spa[0]?.location
                                }
                                target="_blank"
                                className="signle-spa-link"
                              >
                                <span
                                  className="view-detail"
                                >
                                  {" "}
                                  {spa[0]?.location}
                                </span>
                              </a>
                            </MDBListGroupItem>
                          </>
                        )}

                        {spa[0]?.phone && (
                          <>
                            <MDBListGroupItem tag="label">
                              <img src={phoneIcon} alt="..." />{" "}
                              <a
                           
                                onClick={()=>handlePhoneClick(spa[0]?.phone)}
                                className="signle-spa-link"
                              >
                                <span className="view-detail">
                                  {" "}
                                  {spa[0]?.phone}
                                </span>
                              </a>
                            </MDBListGroupItem>
                          </>
                        )}

                        {spa[0]?.email && (
                          <>
                            <MDBListGroupItem tag="label">
                              <EmailIcon
                                style={{ fontSize: "17px", color: "#c8175d" }}
                              />

                              <a
                                href={`mailto:${spa[0]?.email}`}
                                className="signle-spa-link"
                                style={{ marginLeft: "2px" }}
                              >
                                <span className="view-detail">
                                  {" "}
                                  {spa[0]?.email}
                                </span>
                              </a>
                            </MDBListGroupItem>
                          </>
                        )}

                        {spa[0]?.website && (
                          <>
                            <MDBListGroupItem tag="label">
                              <img src={worldIcon} alt="..." />{" "}
                              <a
                                href="https://bodyslides.ca"
                                className="signle-spa-link"
                                target="_blank"
                              >
                                <span className="view-detail">
                                  {spa[0]?.website}
                                </span>
                              </a>
                            </MDBListGroupItem>
                          </>
                        )}

                        {massuseId && (
                          <>
                            <MDBListGroupItem tag="label">
                              <PeopleAltIcon
                                style={{
                                  fontSize: "21px",
                                  color: "#c8175d",
                                  marginBottom: "6px",
                                }}
                              />
                              <span
                                style={{
                                  marginLeft: "3px",

                                  color: "black",
                                  marginLeft: "5px", // textDecoration: "underline",
                                }}

                              >
                                Staff of
                              </span>{" "}
                              <br />
                              {spa[0]?.spaMessauses?.map((child) => (
                                <>
                                  <p style={{ marginBottom: "0.6rem" }}>
                                    <span style={{ marginLeft: "18px" }}>
                                      <FiberManualRecordIcon
                                        style={{
                                          fontSize: "14px",
                                          // paddingBottom: "4px",
                                          marginRight: "3px",
                                          color: "#c8175d",
                                        }}
                                      />

                                      <span
                                        style={{
                                          cursor: "pointer",

                                        }}
                                        className="view-detail"
                                        onClick={() => {
                                          navigate(
                                            `/single-masseuse?id=${child.masseuse.id}`
                                          );
                                        }}
                                      >
                                        {child.masseuse.name}
                                      </span>
                                    </span>
                                  </p>
                                </>
                              ))}
                            </MDBListGroupItem>
                          </>
                        )}
                        {spa[0]?.services?.length > 0 && (
                          <>
                            <MDBListGroupItem tag="label">
                              <HomeRepairServiceIcon
                                style={{
                                  fontSize: "21px",
                                  color: "#c8175d",
                                  marginBottom: "6px",
                                }}
                              />
                              <span
                                style={{
                                  marginLeft: "3px",
                                  color: "black",
                                  marginLeft: "5px",
                                }}
                              >
                                Services
                              </span>{" "}
                              <br />
                              {spa[0].services.map((service) => (
                                <>
                                  <p style={{ marginBottom: "0.6rem" }}>
                                    <span style={{ marginLeft: "18px" }}>
                                      <FiberManualRecordIcon
                                        style={{
                                          fontSize: "14px",

                                          marginRight: "3px",
                                          color: "#c8175d",
                                        }}
                                      />

                                      <span
                                        style={{
                                          color: "#000000",
                                        }}
                                      >
                                        {service}
                                      </span>
                                    </span>
                                  </p>
                                </>
                              ))}
                            </MDBListGroupItem>
                          </>
                        )}
                      </MDBListGroup>
                    </div>
                    <div className="col-md-3">
                      <div className="single-spa-other-info">
                        {spa[0].comment && (
                          <>
                            {/* <h5>Additional Information</h5> */}
                            {handleComment(spa[0].comment) ? (
                              <>
                                <ul
                                  style={{
                                    padding: "0px",
                                    margin: "0px",
                                    listStyle: "none",
                                  }}
                                  className="single-spa-other-small"
                                >
                                  <li style={{ textAlign: "justify", fontSize: "small" }}>{spa[0].comment}</li>
                                </ul>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div
                      // className="col-md-5"
                      style={{ width: "500px" }}
                    >
                      <table class="table services-timing">
                        <tr>
                          <td colspan="4" class="text-center">
                            <h3 style={{ marginTop: "-8px" }}>
                              <Icon
                                className="service-timing-icon"
                                icon="ant-design:clock-circle-filled"
                                style={{ marginTop: "4px" }}
                              />
                              <span className="top-heading">
                                &nbsp; Service Hours
                              </span>
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              <b> Mon</b>{" "}
                            </h5>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              {spa[0]?.hourOfOpertaion[0]?.mon?.isOpen ===
                                "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[0]?.mon?.from} -{" "}
                                  {spa[0].hourOfOpertaion[0]?.mon?.to}
                                </b>
                              ) : (
                                <b>Closed</b>
                              )}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row" style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              <b>Tue</b>{" "}
                            </h5>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              {spa[0]?.hourOfOpertaion[1]?.tue?.isOpen ===
                                "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[1]?.tue?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[1]?.tue?.to}
                                </b>
                              ) : (
                                <b>Closed</b>
                              )}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row" style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              <b>Wed</b>{" "}
                            </h5>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              {spa[0]?.hourOfOpertaion[2]?.wed?.isOpen ===
                                "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[2]?.wed?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[2]?.wed?.to}
                                </b>
                              ) : (
                                <b>Closed</b>
                              )}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row" style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              <b>Thu</b>{" "}
                            </h5>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              {spa[0]?.hourOfOpertaion[3]?.thu?.isOpen ===
                                "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[3]?.thu?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[3]?.thu?.to}
                                </b>
                              ) : (
                                <b>Closed</b>
                              )}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row" style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              <b>Fri</b>
                            </h5>
                          </td>

                          <td scope="row" style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              {spa[0]?.hourOfOpertaion[4]?.fri?.isOpen ===
                                "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[4]?.fri?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[4]?.fri?.to}
                                </b>
                              ) : (
                                <b>Closed</b>
                              )}
                            </h5>
                          </td>
                        </tr>

                        <tr>
                          <td scope="row" style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              <b>Sat</b>
                            </h5>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              {spa[0]?.hourOfOpertaion[5]?.sat?.isOpen ===
                                "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[5]?.sat?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[5]?.sat?.to}
                                </b>
                              ) : (
                                <b>Closed</b>
                              )}
                            </h5>
                          </td>
                        </tr>

                        <tr>
                          <td scope="row" style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              <b>Sun</b>{" "}
                            </h5>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <h5 class="st-heading">
                              {spa[0]?.hourOfOpertaion[6]?.sun?.isOpen ===
                                "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[6]?.sun?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[6]?.sun?.to}
                                </b>
                              ) : (
                                <b>Closed</b>
                              )}
                            </h5>
                          </td>
                        </tr>
                        <br />
                      </table>
                    </div>
                  </div>
                </div>

            
              </div>
            </div>
          </div>


          {spa[0]?.image?.length > 0 && (
            <>
              <div className="contain">
                <h2 className="heading spa-sigle-heading">Gallery</h2>

                <Gallery
                  images={spa[0].image}
                  imageLoaded={imageLoaded}
                  loading={loading}
                />
              </div>
            </>
          )}

          <div
            className="spa-banner-bg"
            style={{ backgroundImage: `url(${bg3})` }}
          >

            <SingleMostRecentSpaDiscussion
              spaid={spaid}
              searchValue={searchValue}
              name={spa[0].name}
              locationAddress={spa[0].location}
              phoneNumber={spa[0].phone}
              isForum={location.state}
            />
            {/* <SingleSpaDiscussionReviews
              spaId={spaid}
              name={spa[0].name}
              myRef={myRef}
            /> */}
          </div>
        </>
      )}
    </>
  );
}
