import React, { useState, useEffect } from "react";
import { isLogin } from "../../utils/isLogins";
import { useNavigate, NavLink } from "react-router-dom";
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
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import views from "../../assets/views.svg";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import {
  getMasseuseaForumRatingIndividual,
  postMasseuseForumRating,
} from "../../axiosCalls";
import Pagination from "../pagination/Pagination";

const SingleSpaDiscussionReviews = (props) => {
  const [data, setData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [rating, setrating] = useState();
  const [spaForumRating, setSpaForumRating] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [flag, setFlag] = useState(0);
  const navi = useNavigate();

  const givRating = {
    size: 40,
    value: 2.5,
    edit: true,
    activeColor: "#FFA853",
    onChange: (newValue) => {
      setrating(newValue);
    },
  };

  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setTitle("Most Recent Reviews on  ");
      await getMasseuseaForumRatingIndividual(props.spaId).then((res) => {
        console.log(res.data, "response");
        setSpaForumRating(res.data.data);
      });
    };

    fetchData();
  }, [flag]);

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  // Submit posting of new rating

  const handlePostRating = async () => {
    const { spaId } = props;
    const userId = localStorage.getItem("userID");
    const data = JSON.stringify({
      review: message,
      rating: rating.toString(),
      userId,
      masseuseId: spaId,
    });
    if (rating) {
      await postMasseuseForumRating(data).then((res) => {
        setFlag(flag + 1);
        toast("Review Added Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        toggleShow();
      });
    }
  };

  const handleReview = () => {
    if (isLogin()) {
      toggleShow();
    } else {
      navi("/login");
    }
  };

  return (
    <>
      <br />
      <MDBRow className="discussion-section panel-row" ref={props.myRef}>
        <MDBCol md={12}>
          <MDBRow
            style={{
              borderRadius: "30px",
              // padding: '0 10% 10% 10%',
              background: "#FFFFFF",
              boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <MDBCol md={12} className="panel-head">
              <>
                <MDBRow className="panelHeading">
                  <MDBCol md={6}>
                    {title} {props.name}{" "}
                  </MDBCol>
                  <MDBCol md={6}>
                    <MDBBtn
                      outline
                      color="light"
                      onClick={handleReview}
                      className="dis-review-button"
                    >
                      Give Review
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                {spaForumRating.map((currentValue) => {
                  let showrating = {
                    size: 20,
                    value: currentValue.rating,
                    edit: false,
                    activeColor: "#FFA853",
                  };
                  return (
                    <>
                      <MDBRow style={{ padding: "1.5% 0" }}>
                        <MDBRow>
                          <MDBCol className="dis-review-emails" md={8}>
                            <span className="dis-email">
                              {currentValue.user.userName}
                            </span>
                            {currentValue.createdAt.substring(0, 10)}{" "}
                            &nbsp;&nbsp;&nbsp;
                            {formatTime(
                              currentValue.createdAt.substring(11, 16)
                            )}
                            <MDBRow>
                              <MDBCol
                                md={2}
                                className="col-6"
                                style={{ display: "flex" }}
                              >
                                <ReactStars
                                  style={{}}
                                  {...showrating}
                                ></ReactStars>
                              </MDBCol>
                              {/* <MDBCol className="no-rating col-6" md={1}>
                                ({currentValue.Rating}/5)
                              </MDBCol> */}
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow style={{ paddingTop: "1%" }}>
                          <MDBCol md={12} className="daysCount">
                            {currentValue.review}
                          </MDBCol>
                        </MDBRow>
                      </MDBRow>
                      <hr />
                    </>
                  );
                })}

                <Pagination
                  currentPage={currentPage}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  setPostsPerPage={setPostsPerPage}
                />
              </>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      {/* Model */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog style={{ marginTop: "107px" }}>
          <MDBModalContent>
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

              <MDBTextArea
                label="Message"
                id="model-area"
                rows={6}
                onChange={(e) => setMessage(e.target.value)}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                className="btn btn-outline btn-create-post"
                onClick={toggleShow}
              >
                Cancel
              </MDBBtn>
              <MDBBtn onClick={handlePostRating}>Post</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
export default SingleSpaDiscussionReviews;
