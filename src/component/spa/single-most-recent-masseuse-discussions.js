import React, { useState, useEffect } from "react";
import { isLogin } from "../../utils/isLogins";
import TimeSinceCreation from "../TimeSinceCreation "
import "../../css/thread-list.css";
import {
  MDBRow,
  MDBCol,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBTextArea,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import views from "../../assets/views.svg";
import arrow from "../../assets/icons/arrow.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import Pagination from "../../accounts/component/Pagination";
import {
  getSpaForum,
  getMasseuseForumIndividual,
  masseuseRecentDiscussion,
} from "../../axiosCalls";
import { toast } from "react-toastify";

const SingleMostRecentSpaDiscussion = ({
  spaid,
  searchValue,
  name,
  locationAddress,
  phoneNumber,
  parantName,
  isForum
}) => {
  const [title, setTitle] = useState();
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [spaforumdata, setspaforumdata] = useState([]);

  const [formValue, setFormValue] = useState([]);
  const [SpaData, setSpaData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const [forumtPerPage, setForumtPerPage] = useState(8)
  const [totalForum, setTotalForum] = useState(0)
  const [activeNumber, setActiveNumber] = useState(1);
  let lastForumtIndex;
  let firstForumIndex;

  const postChange = (e) => {
    console.log(e);
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const submitPost = async () => {
    if (formValue.topic && formValue.description) {
      await masseuseRecentDiscussion(
        spaid,
        formValue.topic,
        formValue.description
      ).then((res) => {
        toggleShow();
        setCounter(counter + 1);
      });
    }
  };

  const navi = useNavigate();

  useEffect(() => {
    setTitle(`Most Recent Threads on ${name}`);
    const fetchData = async () => {
      if (currentPage === 0) {
        firstForumIndex = currentPage
        lastForumtIndex = currentPage
      } else {
        lastForumtIndex = currentPage * forumtPerPage
        firstForumIndex = lastForumtIndex - forumtPerPage
      }
      await getMasseuseForumIndividual(spaid, firstForumIndex, forumtPerPage).then((res) => {
        setspaforumdata(res.data.data);
      });

      if (isForum) {
        var scrollToForum = document.getElementById("scrollTo");
        scrollToForum.scrollIntoView();
      }
    };

    fetchData();
  }, [counter, forumtPerPage]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModalState]);

  // update score
  let updateScore = (score, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.score = score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.score = score;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  // add comments
  let addComments = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };

  // add replies
  let updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if (data.id === id) {
        data.replies = [...replies];
      }
    });
    updateComments(updatedComments);
  };

  // edit comment
  let editComment = (content, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.content = content;
          }
        });
      });
    }

    updateComments(updatedComments);
  };

  // delete comment
  let commentDelete = (id, type, parentComment) => {
    let updatedComments = [...comments];
    let updatedReplies = [];

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment.replies.filter((data) => data.id !== id);
          comment.replies = updatedReplies;
        }
      });
    }

    updateComments(updatedComments);
  };
  const addReply = (newReply) => {
    const replies = [...comments.replies, newReply];
    updateReplies(replies, comments.id);
    setReplying(false);
  };
  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : comments.id;
    commentDelete(finalId, finalType, comments.id);
    setDeleting(false);
  };

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  const filteredSpaForumData = spaforumdata?.filter((item) => {
    return searchValue !== ""
      ? item.topic?.toLowerCase().includes(searchValue?.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchValue?.toLowerCase())
      : item;
  });

  const spaTime = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const result = currentDate.getTime() - postDate.getTime();

    const finalResult = Math.ceil(result / (1000 * 3600 * 24));

    return finalResult;
  };

  const nOfThread = (comment) => {
    let threads = 0;
    comment.map((singleComment) => {
      if (singleComment.Replies.length > 0) {
        threads++;
      }
    });
    return threads;
  };

  const handleCreatePost = () => {
    if (isLogin()) {
      navi("/single-masseuse-post", { state: { spaId: spaid, name: name } });
    } else {
      localStorage.setItem("previousSpecficPage", window.location.pathname +"?id="+spaid);
      navi("/login");
    }
  };

  const handleForum = ( currentValue) =>{
   
    if (!isLogin()) {
      localStorage.setItem("singleSpa", JSON.stringify(currentValue));
      localStorage.setItem("name", name);
      localStorage.setItem("locationAddress", locationAddress);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("parantName", parantName);
    }
    navi("/masseuse-thread", { state: { singleSpa: currentValue, name,locationAddress,phoneNumber,parantName } });

}

  return (
    <>
      <MDBRow className="discussion-section panel-row">
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
              <MDBRow className="panelHeading">
                <MDBCol md={6} className="title-small-screen">{title}
                  <div className="singleSpa-mb-createPost">
                    <MDBBtn
                      outline
                      color="light"
                      onClick={handleCreatePost}
                      className="dis-review-button"
                    >
                      Create Post
                    </MDBBtn>
                  </div>
                </MDBCol>
                <MDBCol md={6} className="singleSpa-createPost">
                  <MDBBtn
                    outline
                    color="light"
                    onClick={handleCreatePost}
                    className="dis-review-button"
                  >
                    Create Post
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBCol className="m-4">
              <div className="thread-list">
                <MDBRow className="thread-list-header">
                <MDBCol md={8} className="p-2">
                    Threads
                  </MDBCol>
                  <MDBCol md={1} className="p-2" style={{ textAlign: "center" }}>
                    Replies
                  </MDBCol>
                  <MDBCol md={1} className="p-2" style={{ textAlign: "center" }}>
                    Views
                  </MDBCol>
                  <MDBCol md={2} className="p-2 ps-4">
                    Last post
                  </MDBCol>
                </MDBRow>
                {filteredSpaForumData?.map((currentValue) => (
                  <MDBRow className="thread-list-item">
                    <MDBCol md={8} className="p-2">
                      <span
                        onClick={() => handleForum(currentValue)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="topic-title" style={{fontSize:"16px", color:"#00008b"}}>
                          {currentValue.topic}
                        </span>
                      </span>
                      <br />
                      <span style={{fontSize: "12px", color: "#999"}}>
                        <span className="me-4">[User Name]</span>
                        {currentValue.createdAt.substring(0, 10)}{" "}
                        {formatTime(currentValue.createdAt.substring(11, 16))}
                      </span>
                      {/* <p>{Parser(currentValue._source.payload.masseuse.description)}</p> */}
                    </MDBCol>
                    <MDBCol md={1} className="p-2" style={{textAlign:"center", backgroundColor:"#f7f6f4"}}>
                      <span style={{ cursor: "pointer", fontSize:"14px" }}>                         
                        {currentValue.no_comments + " "}
                      </span>
                    </MDBCol>
                    <MDBCol md={1} className="p-2" style={{textAlign:"center", backgroundColor:"#f7f6f4"}}>
                      <span className="viewsCount-comment" style={{ cursor: "pointer", fontSize:"14px" }}>
                        {/* <img src={views} alt="eye icon" /> */}
                        {currentValue.views}
                      </span>
                    </MDBCol>
                    <MDBCol md={2} className="p-2 ps-4">
                      <span style={{ cursor: "pointer", fontSize:"13px", color:"#00008b" }}>                        
                        [Poster Name]
                      </span>
                      <br />
                      <span style={{fontSize: "12px", color: "#999"}}>
                        {currentValue.createdAt.substring(0, 10)}{" "}
                        {formatTime(currentValue.createdAt.substring(11, 16))}
                      </span>
                    </MDBCol>
                  </MDBRow>
                ))}
              </div>

              <div className="thread-list--mobile">
              {filteredSpaForumData?.map((currentValue) => (
                  <MDBRow className="thread-list-item">
                    <MDBCol md={8} className="p-2">
                      <span
                        onClick={() => handleForum(currentValue)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="topic-title" style={{fontSize:"16px", color:"#00008b"}}>
                          {currentValue.topic}
                        </span>
                      </span>
                      <br />
                      <div style={{ fontSize: "11px", color: "#999" }}>
                        <span className="me-2">[User Name]  -  Updated</span>
                        {currentValue.createdAt.substring(0, 10)}{" "}
                        {formatTime(currentValue.createdAt.substring(11, 16))}
                      </div>
                      {/* <p>{Parser(currentValue._source.payload.masseuse.description)}</p> */}
                      <div>
                          <span style={{ fontSize: "12px", color: "#999" }} className="me-4">
                            <span style={{ cursor: "pointer", fontSize: "14px" }}>
                            {currentValue.no_comments + " "}
                            </span>
                            <span className="me-2"> Replies</span>

                          </span>
                          <span style={{ fontSize: "12px", color: "#999" }} >
                            <span className="viewsCount-comment" style={{ cursor: "pointer", fontSize: "14px" }}>
                            {currentValue.views}
                            </span>
                            <span className="me-2"> Views</span>
                          </span>
                        </div>
                    </MDBCol>
                  </MDBRow>
                ))}
              </div>
              </MDBCol>
            </MDBCol>
            <Pagination activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage} />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <br />
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

            <MDBModalBody style={{ padding: "" }}>
              <h2 className="model-heading mb-6">{name}</h2>
              <MDBRow>
                <MDBCol md={3}>
                  <h5 className="model-text">
                    Title<span style={{ color: "red" }}>*</span>
                  </h5>
                </MDBCol>
                <MDBCol md={9}>
                  {" "}
                  <MDBInput
                    type="text"
                    name="topic"
                    onChange={postChange}
                    label="Write a descriptive title"
                    id="model-area"
                    required
                    className="mb-3"
                  />
                </MDBCol>
                <MDBCol md={3}>
                  <h5 className="model-text">
                    Description<span style={{ color: "red" }}>*</span>
                  </h5>
                </MDBCol>
                <MDBCol md={9}>
                  <MDBTextArea
                    label=" Write a Description"
                    name="description"
                    id="model-area"
                    onChange={postChange}
                    required
                    rows={6}
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                className="btn btn-outline btn-create-post"
                onClick={toggleShow}
              >
                Cancel
              </MDBBtn>
              <MDBBtn onClick={submitPost}>Post</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
export default SingleMostRecentSpaDiscussion;
