import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import "../css/main.css";
import aboutSection3 from "../assets/about/about-section-3.svg";
import aboutSection2 from "../assets/about/about-section-2.svg";
import aboutSection1 from "../assets/about/about-section-1.svg";
import heroBg from "../assets/hero-bg.png";
import leftImg from "../assets/spa-sec-left.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context/dataContext";
import {
  getBusiness,
  getActiveUsers,
  hSpaBusinessesFunc,
  masseuseProfiles,
  getNumberOfViews,
} from "../axiosCalls/business";
import { useEffect, useState, useContext } from "react";
import parse from "html-react-parser";

import rightImg from "../assets/about/about-us-right.png";

export default function AboutUs() {
  const [getAllBusiness, setAllBusiness] = useState();
  const [activeUsers, setActiveUsers] = useState();
  const [hSpaBusinesses, sethspabusinesses] = useState();
  const [masseuse, setMasseuse] = useState();
  const [websiteView, setWebsiteView] = useState();
  const { setIsSearchPage } = useContext(Context);

  function changeData(value) {
    if (value >= 1000) {
      let len = value.length;
      console.log("Length is ", len);
      value = value / 1000;
      value = parseInt(value, 10);
      value = value + "k";
    }
    return value;
  }

  function getBusinessData() {
    getBusiness()
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          console.log("All businesses are here");
          console.log(res?.data?.business_data);
          setAllBusiness(res?.data?.business_data);
        } else {
          console.log("No businesses are here");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  useEffect(() => {


    function getUsers() {
      getActiveUsers()
        .then((res) => {
          console.log(res)
          if (res?.data?.active_Users) {
            let newValue = changeData(res?.data?.active_Users);
            setActiveUsers(newValue);
          } else {
            setActiveUsers(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function getPageView() {
      getNumberOfViews()
        .then((res) => {
          setWebsiteView(res.data.sum);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function getSpa() {
      hSpaBusinessesFunc()
        .then((res) => {

          if (res?.data?.hspa_businesses) {
            let newValue = changeData(res?.data?.hspa_businesses);
            sethspabusinesses(newValue);
          } else {
            sethspabusinesses(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function getMasseuseProfile() {
      masseuseProfiles()
        .then((res) => {
          if (res?.data?.masseuse_profiles) {
            let newValue = changeData(res?.data?.masseuse_profiles);
            setMasseuse(newValue);
          } else {
            setMasseuse(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }


    getBusinessData();
    getUsers();
    getPageView();
    getSpa();
    getMasseuseProfile();
    setIsSearchPage(false)
    //getMasseuse();
  }, []);
  const navigate = useNavigate();
  const handlerRegisterSpa = () => {
    navigate("/account/spa", { state: { linkId: 2 } });
  };
  const handlerRegisterMasseuse = () => {
    navigate("/account/masseuse/add");
  };

  return (
    <>
      <div
        className="hero-section section overlay"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="">
          <div className="row main-row-adv">
            <div className="col left-side">
              <h2 className="about-heading">
                Let's get back to
                <br />
                business
              </h2>
              <MDBRow className=" mtp-5p about-hr-line">
                <MDBCol md={12}>
                  {/* <p className='about-us-heading'>For Businesses</p> */}
                  <p className="about-us-heading">
                    For Massage and Spa Businesses <br />
                  </p>

                  <hr className="about-hr-line" />
                  <p style={{ fontWeight: 600 }}>
                    Is your business on bodyslides?
                  </p>
                  <p style={{ fontWeight: 600 }}>
                    If not, let’s change that. Adding your business is free and
                    easy.
                  </p>
                </MDBCol>
              </MDBRow>

              <MDBRow className=" mtp-5p about-hr-line">
                <div
                  // md={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "514px",
                  }}
                >
                  <MDBBtn
                    type="button"
                    className="btn-regtr btn-about-page"
                    // block
                    onClick={handlerRegisterSpa}
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    + Add Massage Business
                  </MDBBtn>
                  {/* <MDBBtn
                    type="button"
                    className="btn-regtr"
                    style={{
                      fontSize: "15px",
                    }}
                    // block
                    onClick={handlerRegisterMasseuse}
                  >
                    + Add Masseuse Business
                  </MDBBtn> */}
                </div>
              </MDBRow>
            </div>

            <div className="col about-banner about-image-top">
              <img src={rightImg} className="" />
            </div>
          </div>
        </div>
      </div>

      <MDBRow className="mlr-5p ">
        <MDBRow className=" about-div-spacing">
          <MDBCol md={7} className="about-image-top">
            <img
              className="about-sec-img"
              src={aboutSection1}
              alt="bring your business to life"
            />
          </MDBCol>
          <MDBCol md={5}>
            <h2 className="heading-about about-heading">Help people get to know you</h2>

            <ul>
              <li className="list-about ">
                {" "}
                Update your business info so people can find you
              </li>
              <li className="list-about ">
                Respond to reviews and messages as soon as they come in
              </li>
              <li className="list-about ">
                Add photos to showcase the best of your business
              </li>
            </ul>
            {/* <p className="description-about">
              Having a strong presence on Yelp helps you establish trust with
              potential customers. Manage your page for free or upgrade to stand
              out from the competition.
            </p> */}
            <p className="description-about">
              Having a strong presence on bodyslides helps you establish trust
              with potential customers. Manage your page for free or upgrade to
              stand out from the competition. Reach 3x more potential customers.
            </p>
          </MDBCol>
        </MDBRow>

        <MDBRow className=" about-div-spacing">
          <MDBCol md={6}>
            <p className="heading-about about-heading">
              Reach more potential customers with bodyslides
            </p>

            <ul>
              <li className="list-about ">Reach more potential customers</li>
              <li className="list-about ">
                Create and customize your ad to be shown on bodyslides
              </li>
              <li className="list-about ">
                Attract customers local to your business for repeat and regular
                visits
              </li>
            </ul>
            <p className="description-about">
              Get in front of more customers when they’re searching for local
              businesses like yours.
            </p>
          </MDBCol>
          <MDBCol md={6}>
            <img
              src={aboutSection2}
              className="about-sec-img"
              alt="bring your business to life"
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className=" reversble-section">
          <MDBCol md={7}>
            <img
              src={aboutSection3}
              className="about-sec-img"
              alt="bring your business to life"
            />
          </MDBCol>
          <MDBCol md={5}>
            <p className="heading-about about-heading">
              Bring your business to life with bodyslides
            </p>

            <ul>
              <li className="list-about ">
                Creating a spa business page is fast and easy
              </li>
              <li className="list-about ">
                Post about what’s new, what’s hot and what’s unique about your
                business
              </li>
              <li className="list-about ">
                Your posts are promoted to the front page of bodyslides
              </li>
            </ul>
            <p className="description-about">
              bodyslides lets you manage your own page and profile so people can
              learn more about your business.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBRow>

      <div class="container-fluid about-footer-space">
        {/* <div class="row">
        <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12" id="advertisecol">
          <h5 class="advertise" >ADVERTISE WITH US</h5>
          <button class="letstalk"  >   <NavLink to="/advertisers">Let's Talk</NavLink></button>
        </div>
        <div class="col-lg-4 col-sm-12 col-xs-12 col-md-12 adv-image-sec" >
          <div class="flowerimg">
      <img src={leftImg} />
      
      </div>
        </div>
      </div> */}
      </div>

      <MDBRow>
        <MDBCol md={2}></MDBCol>
        <MDBCol md={8}>
          <MDBRow className="about-stats-div">
            <MDBCol md={3} className="center about-stats">
              <p>{activeUsers}</p>
              <p>Active Users</p>
            </MDBCol>
            <MDBCol md={3} className="center about-stats">
              <p>{hSpaBusinesses}</p>
              <p>Spa Businesses</p>
            </MDBCol>
            <MDBCol md={3} className="center about-stats">
              <p>{masseuse}</p>
              <p>Masseuse Profiles</p>
            </MDBCol>
            <MDBCol md={3} className="center about-stats">
              <p>{websiteView}</p>
              <p>Page Views</p>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md={2}></MDBCol>
      </MDBRow>
    </>
  );
}
