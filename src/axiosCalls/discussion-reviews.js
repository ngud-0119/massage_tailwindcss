import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBTextArea,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import views from "../assets/views.svg";
import ReactStars from "react-rating-stars-component";

const DiscussionReviews = () => {
  const [data, setData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const givRating = {
    size: 40,
    value: 2.5,
    edit: true,
    isHalf: true,
  };

  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle("Most Recent Reviews on  Detroit Rolling pub");
    const data = [
      {
        text: 'Secure Place, Professional Staff, Maintain Privacy. All Someone need to do is to contact them. Rest all they will provide You. One word "Reliable Staff"',
        email: "jen@gmail.com",
        rating: 4,
        date: "2022-07-15 8:10 PM",
      },

      {
        text: "I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.",
        email: "jen@gmail.com",
        rating: 2,
        date: "2022-07-15 8:10 PM",
      },

      {
        text: "I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.",
        email: "jen@gmail.com",
        rating: 3,
        date: "2022-07-15 8:10 PM",
      },

      {
        text: "I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.",
        email: "jen@gmail.com",
        rating: 5,
        date: "2022-07-15 8:10 PM",
      },

      {
        text: "I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.",
        email: "jen@gmail.com",
        rating: 4,
        date: "2022-07-15 8:10 PM",
      },
    ];
    setData(data);
  }, []);
  return (
    <>
      <br />
      <MDBRow className="discussion-section">
        <MDBCol md={12}>
          <MDBRow
            style={{
              borderRadius: "30px",
              // padding: '0 10% 10% 10%',
              background: "#FFFFFF",
              boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <MDBCol md={12}>
              <>
                <MDBRow className="panelHeading">
                  <MDBCol md={12}>
                    {title}
                    <MDBBtn
                      outline
                      color="light"
                      onClick={toggleShow}
                      className="dis-review-button"
                    >
                      Give Review
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                {data.map((currentValue) => {
                  let showrating = {
                    size: 20,
                    value: currentValue.rating,
                    edit: false,
                    isHalf: true,
                  };
                  return (
                    <>
                      <MDBRow style={{ padding: "1.5% 0" }}>
                        <MDBRow>
                          <MDBCol className="dis-review-emails" md={8}>
                            <span className="dis-email">
                              {currentValue.email}
                            </span>
                            {currentValue.date}
                            <MDBRow>
                              <MDBCol md={2}>
                                <ReactStars
                                  style={{}}
                                  {...showrating}
                                ></ReactStars>
                              </MDBCol>
                              <MDBCol className="no-rating" md={1}>
                                ({currentValue.rating}/5)
                              </MDBCol>
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow style={{ paddingTop: "1%" }}>
                          <MDBCol md={12} className="daysCount">
                            {currentValue.text}
                          </MDBCol>
                        </MDBRow>
                      </MDBRow>
                      <hr />
                    </>
                  );
                })}
                <div>
                  <center>
                    1 &nbsp;&nbsp; 2 &nbsp;&nbsp; 3 &nbsp;&nbsp;&nbsp; Next
                  </center>
                </div>
              </>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      {/* Model */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent style={{ width: "650px" }}>
            <span className="close-button">
              <MDBBtn
                className="btn-close model-close-btn"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </span>

            <MDBModalBody style={{ padding: "50px" }}>
              <h2 className="model-heading">Review</h2>
              <ReactStars {...givRating} />

              <MDBTextArea label="Message" id="model-area" rows={6} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={toggleShow}>Cancel</MDBBtn>
              <MDBBtn>Post</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
export default DiscussionReviews;
