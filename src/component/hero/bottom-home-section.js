import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import "../../css/main.css";

import heroBg from "../../assets/hero-bg.png";
import bottomImg from "../../assets/bottom-img.png";
import leftImg from "../../assets/spa-sec-left.png";
import { getHomePages } from "../../axiosCalls/business";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

import rightImg from "../../assets/about/about-us-right.png";
import { NavLink } from "react-router-dom";

export default function BttomHomeSection() {
  const [getAllBusiness, setAllBusiness] = useState();
  const [activeUsers, setActiveUsers] = useState();
  const [hSpaBusinesses, sethspabusinesses] = useState();
  const [masseuse, setMasseuse] = useState();

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
    getHomePages()
      .then((res) => {
        console.log("Homepages");
        console.log(res);
        if (res?.data?.success) {
          console.log("All businesses are here");
          console.log(res?.data?.business_data);
          setAllBusiness(res?.data?.homepage_data);
        } else {
          console.log("No businesses are here");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //   function getUsers() {
  //     getActiveUsers()
  //       .then((res) => {
  //         if (res?.data?.active_Users) {
  //           let newValue = changeData(res?.data?.active_Users);
  //           setActiveUsers(newValue);
  //         } else {
  //           setActiveUsers(0);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   function getSpa() {
  //     hSpaBusinessesFunc()
  //       .then((res) => {
  //         if (res?.data?.hspa_businesses) {
  //           let newValue = changeData(res?.data?.hspa_businesses);
  //           sethspabusinesses(newValue);
  //         } else {
  //           sethspabusinesses(0);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   function getMasseuseProfile() {
  //     masseuseProfiles()
  //       .then((res) => {
  //         if (res?.data?.masseuse_profiles) {
  //           let newValue = changeData(res?.data?.masseuse_profiles);
  //           setMasseuse(newValue);
  //         } else {
  //           setMasseuse(0);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  useEffect(() => {
    getBusinessData();
    // getUsers();
    // getSpa();
    // getMasseuseProfile();
    //getMasseuse();
  }, []);

  return (
    <>
      <div
        className="hero-section section overlay"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* <div className="">
          <div className="row main-row-adv">
            <div className="col left-side">
              <h2 className="about-heading">
                Let's get back to <br /> business
              </h2>
              <MDBRow className=" mtp-5p about-hr-line">
                <MDBCol md={12}>
                  <p className="about-us-heading">For Businesses</p>
                  <hr className="about-hr-line" />
                </MDBCol>
              </MDBRow>
            </div>

            <div className="col about-banner">
              <img src={rightImg} className="" />
            </div>
          </div>
        </div> */}
      </div>

      <MDBRow className="mlr-5p ">
        {getAllBusiness ? (
          getAllBusiness?.map((item, index) => (
            <div key={item.id}>
              {index % 2 ? (
                <MDBRow className=" about-div-spacing">
                  <MDBCol md={6}>
                    <img
                      className="about-sec-img"
                      src={`http://https://bodyslides.ca/${item?.image}`}
                      // alt="bring your business to life"
                    />
                  </MDBCol>
                  <MDBCol md={6} style={{ paddingLeft: "50px" }}>
                    {parse(item.content)}
                    {/* <button className="primaryBtn showBtn-spacing">
                      Show More
                    </button> */}
                  </MDBCol>
                </MDBRow>
              ) : (
                <MDBRow className=" about-div-spacing">
                  <MDBCol md={6} style={{ paddingRight: "50px" }}>
                    {parse(item.content)}
                    {/* <button className="primaryBtn showBtn-spacing">
                      Show More
                    </button> */}
                  </MDBCol>
                  <MDBCol md={6}>
                    <img
                      src={`http://https://bodyslides.ca/${item?.image}`}
                      className="about-sec-img"
                      // alt="bring your business to life"
                    />
                  </MDBCol>
                </MDBRow>
              )}
            </div>
          ))
        ) : (
          <div></div>
        )}

        {/* <MDBRow className=' reversble-section'>
					<MDBCol md={7}>
						<img
							src={aboutSection3}
							className='about-sec-img'
							alt='bring your business to life'
						/>
					</MDBCol>
					<MDBCol md={5}>
						<p className='heading-about'>
							Bring your business to life with bodyslides Connect
						</p>

						<ul>
							<li className='list-about '>Creating a post is fast and easy</li>
							<li className='list-about '>
								Post about what’s new, what’s hot and what’s unique about your
								business
							</li>
							<li className='list-about '>
								Your posts are promoted in emails to Yelp users every week
							</li>
						</ul>
						<p className='description-about'>
							bodyslides Connect lets you post regular updates so you can help
							potential customers learn more about your business.
						</p>
						<button className='primaryBtn showBtn-spacing'>Show More</button>
					</MDBCol>
				</MDBRow> */}
      </MDBRow>

      {/* <MDBRow className="mlr-5p ">
        <div className="bottom">
          <div className="row bottom-banner">
            <div className="col bottom-left">
              <h3 className="b-heading">
                A FIRST IMPRESSION IS MADE IN 7 SECONDS
              </h3>
              <p>
                When you travel to a new city, it takes time till you find your
                new favorite place or visit what's best here. You will want to
                visit the best places there are, but it is so difficult to find
                them!
                <br />
                <br />
                The most reviewed and top rated places are ones that you can
                trust. But take everything with a grain of salt.
                <br />
                <br />
                There are also many hidden gems that are extremely good, but are
                not that popular. Also, always keep an eye on worst reviewed
                places and tourist traps that you should avoid.
              </p>
            </div>
            <div className="col">
              <img src={bottomImg} className="bottomImge" alt="img" />
            </div>
          </div>
        </div>
      </MDBRow> */}

      {/* <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12" id="advertisecol">
            <h5 class="advertise">ADVERTISE WITH US</h5>
            <button class="letstalk">
              {" "}
              <NavLink to="/advertisers">Let's Talk</NavLink>
            </button>
          </div>
          <div class="col-lg-4 col-sm-12 col-xs-12 col-md-12 adv-image-sec">
            <div class="flowerimg">
              <img src={leftImg} />
            </div>
          </div>
        </div>
      </div> */}
      {/* <MDBRow className='adv-section'>
				<MDBCol
					md={5}
					style={{
						padding: '90px',
						marginTop: '120px',
					}}
				>
					<h1>ADVERTISE with US</h1>
					<button className='primaryBtn'>Let’s Talk</button>
				</MDBCol>
				<MDBCol md={5}>
					<img src={leftImg} />
				</MDBCol>
			</MDBRow> */}

      {/* <MDBRow>
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
              <p>1</p>
              <p>Page Views</p>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md={2}></MDBCol>
      </MDBRow> */}
    </>
  );
}
