import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
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
import TimeSinceCreation from "../TimeSinceCreation "
import arrow from "../../assets/icons/arrow.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { NavLink } from "react-router-dom";
import { getAllSpaForum } from "../../axiosCalls";
import "../../css/thread-list.css";
import Parser from "html-react-parser";
import Pagination from "../../accounts/component/Pagination"
const MostRecentSpaDiscussion = () => {
  const [title, setTitle] = useState("");
  const [allSpaForum, setAllSpaForum] = useState([]);
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [value, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0)
  const [forumtPerPage, setForumPerPage] = useState(8)
  const [totalForum, setTotalForum] = useState(0)
  const [activeNumber, setActiveNumber] = useState(1);
  let lastForumtIndex;
  let firstForumIndex;
  useEffect(() => {
    setTitle("Most Recent Spa Discussions");
    const fetchData = async () => {
      if (currentPage === 0) {
        firstForumIndex = currentPage
        lastForumtIndex = currentPage
      } else {
        lastForumtIndex = currentPage * forumtPerPage
        firstForumIndex = lastForumtIndex - forumtPerPage
      }
      await getAllSpaForum(firstForumIndex, forumtPerPage).then((res) => {
        setTotalForum(res.data.data.hits.total.value)
        setAllSpaForum(res.data.data.hits.hits);
      });
    };
    fetchData();
  }, [currentPage]);
  const handleSearch = () => {
    setSearchValue(value);
  };
  const filteredAllSpa = allSpaForum?.filter((item) => {
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
    comment?.map((singleComment) => {
      if (singleComment.Replies.length > 0) {
        threads++;
      }
    });
    return threads;
  };
  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }
  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      handleSearch();
    }
  };
  return (
    <>
      <br />
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
            <div className="thread-list--body">
              <MDBRow className="panelHeading">
                <MDBCol md={6}>
                  <p className="customComponent-title">{title}</p>
                </MDBCol>
                <MDBCol md={6}>
                </MDBCol>
              </MDBRow>
              <MDBCol className="m-3">
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
                {filteredAllSpa.map((currentValue) => (
                  <>
                    {currentValue._source.payload.masseuse.isDeleted ===false &&
                      <MDBRow className="thread-list-item">
                        <MDBCol md={8} className="p-2">
                          <NavLink
                            state={{ singleSpa: currentValue._source.payload.masseuse }}
                            to={"/single-spa?id=" + currentValue._source.payload.masseuse.spaId}
                          >
                            <span className="topic-title" style={{fontSize:"16px", color:"#00008B"}}>
                              {currentValue._source.payload.masseuse.topic}
                            </span>
                          </NavLink>
                          <br />
                          <span style={{fontSize: "12px", color: "#999"}}>
                            <span className="me-4">[User Name]</span>
                            {currentValue._source.payload.masseuse.createdAt.substring(0, 10)}{" "}
                            {formatTime(currentValue._source.payload.masseuse.createdAt.substring(11, 16))}
                          </span>
                          {/* <p>{Parser(currentValue._source.payload.masseuse.description)}</p> */}
                        </MDBCol>
                        <MDBCol md={1} className="p-2" style={{textAlign:"center", backgroundColor:"#F7F6F4"}}>
                          <span style={{ cursor: "pointer", fontSize:"14px" }}>
                            {currentValue._source.payload.masseuse.no_comments + " "}
                          </span>
                        </MDBCol>
                        <MDBCol md={1} className="p-2" style={{textAlign:"center", backgroundColor:"#F7F6F4"}}>
                          <span className="viewsCount-comment" style={{ cursor: "pointer", fontSize:"14px" }}>
                            {/* <img src={views} alt="eye icon" /> */}
                            {currentValue._source.payload.masseuse.views}
                          </span>
                        </MDBCol>
                        <MDBCol md={2} className="p-2 ps-4">
                          <span style={{ cursor: "pointer", fontSize:"13px", color:"#00008B" }}>
                            [Poster Name]
                          </span>
                          <br />
                          <span style={{fontSize: "12px", color: "#999"}}>
                            {currentValue._source.payload.masseuse.createdAt.substring(0, 10)}{" "}
                            {formatTime(currentValue._source.payload.masseuse.createdAt.substring(11, 16))}
                          </span>
                        </MDBCol>
                      </MDBRow>
                    }
                  </>
                ))}
              </div>

              <div className="thread-list--mobile">
                {filteredAllSpa.map((currentValue) => (
                    <>
                      {currentValue._source.payload.masseuse.isDeleted ===false &&
                        <MDBRow className="thread-list-item">
                        <MDBCol md={8} className="p-2">
                          <NavLink
                            state={{ singleSpa: currentValue._source.payload.masseuse }}
                            to={"/single-spa?id=" + currentValue._source.payload.masseuse.spaId}
                          >
                            <span className="topic-title" style={{fontSize:"16px", color:"#00008B"}}>
                              {currentValue._source.payload.masseuse.topic}
                            </span>
                          </NavLink>
                          <br />
                        <div style={{ fontSize: "11px", color: "#999" }}>
                          <span className="me-2">[User Name]  -  Updated</span>
                          <span style={{ fontSize: "12px", color: "#999" }}>
                            {currentValue._source.payload.masseuse.createdAt.substring(0, 10)}{" "}
                            {formatTime(currentValue._source.payload.masseuse.createdAt.substring(11, 16))}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "12px", color: "#999" }} className="me-4">
                            <span style={{ cursor: "pointer", fontSize: "14px" }}>
                              {currentValue._source.payload.masseuse.no_comments + " "}
                            </span>
                            <span className="me-2"> Replies</span>

                          </span>
                          <span style={{ fontSize: "12px", color: "#999" }} >
                            <span className="viewsCount-comment" style={{ cursor: "pointer", fontSize: "14px" }}>
                              {currentValue._source.payload.masseuse.views}
                            </span>
                            <span className="me-2"> Views</span>
                          </span>
                        </div>
                        </MDBCol>
                      </MDBRow>
                      }
                    </>
                  ))}
                </div>
              </MDBCol>
            </div>
            <Pagination activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage} />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <br />
    </>
  );
};
export default MostRecentSpaDiscussion;