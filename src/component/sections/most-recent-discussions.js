import React, { useState, useEffect } from "react";
import "../../css/thread-list.css";
import { isLogin } from "../../utils/isLogins";
import Parser from "html-react-parser";
import Pagination from "../../accounts/component/Pagination"
import TimeSinceCreation from "../TimeSinceCreation "
import '../../css/thread-list.css'
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

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import views from "../../assets/views.svg";
import arrow from "../../assets/icons/arrow.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { getSpaMasseuse, postTrending } from "../../axiosCalls";
import IconDelete from "../../assets/images/icon-delete.svg";

const MostRecentDiscussion = () => {
  const [title, setTitle] = useState("Trending Discussions");
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => {
    setBasicModal(!basicModal);
    setDescription("");
    setTopic("");
    // setFormValue({});
  };
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [flag, setFlag] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [allSpaMasseuseForum, setAllSpaMasseuseForum] = useState([]);

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [value, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0)
  const [forumtPerPage, setForumtPerPage] = useState(8)
  const [totalForum, setTotalForum] = useState(0)
  const [activeNumber, setActiveNumber] = useState(1);
  let lastForumtIndex;
  let firstForumIndex;


  useEffect(() => {
    const fetchData = async () => {
      if (currentPage === 0) {
        firstForumIndex = currentPage
        lastForumtIndex = currentPage
      } else {
        lastForumtIndex = currentPage * forumtPerPage
        firstForumIndex = lastForumtIndex - forumtPerPage
      }
      await getSpaMasseuse(firstForumIndex, forumtPerPage).then((res) => {

        setAllSpaMasseuseForum(res.data.data.hits.hits);
        setTotalForum(res.data.data.hits.total.value)
      });
    };

    fetchData();
  }, [flag, currentPage]);


  const submitPost = async () => {
    if (topic && description) {
      await postTrending(3, topic, description).then((res) => {
        setFlag(flag + 1);



        toggleShow();
      });
    }
  };



  console.log(totalForum)

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModalState]);



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

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }


  const filteredAllSpaMasseuse = allSpaMasseuseForum?.filter((item) => {
    return searchValue !== ""
      ? item._source.payload.masseuse.topic?.toLowerCase().includes(searchValue?.toLowerCase()) ||
      item._source.payload.masseuse.description?.toLowerCase().includes(searchValue?.toLowerCase())
      : item;
  });
  const handleSearch = () => {
    setSearchValue(value);
  };

  const handleRegister = () => {
    if (isLogin()) {

      navigate("/post-trending");
    } else {
      navigate("/login");
    }
  };

  const handleTrendingForum = (currentValue) => {

    if (currentValue._source.payload.forumtype === "generic") {
      if (!isLogin()) {
        localStorage.setItem("singleSpa", JSON.stringify(currentValue._source.payload.masseuse));
        localStorage.setItem("isTrending", true);
      }
      navigate("/generic-thread", { state: { singleSpa: currentValue._source.payload.masseuse, isTrending: true } });
    } else if (currentValue._source.payload.forumtype === "SpaForum") {
      navigate("/single-spa?id=" + currentValue._source.payload.masseuse.spaId, { state: { singleSpa: currentValue._source.payload.masseuse, isTrending: true } });
    } else {
      if (!isLogin()) {
        localStorage.setItem("singleSpa", JSON.stringify(currentValue._source.payload.masseuse));
        localStorage.setItem("isTrending", true);
      }
      navigate("/single-masseuse?id=" + currentValue._source.payload.masseuse.masseuseId, { state: { singleSpa: currentValue._source.payload.masseuse, isTrending: true } });
    }

  };


  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      handleSearch();
    }
  };


  return (
    <div style={{ marginTop: "110px" }}>
      <MDBRow className="post-new-thread panel-row">
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <MDBBtn
            type="button"
            className="btn-trending-post"
            block
            style={{
              fontSize: "15px",
              marginBottom: "-15px",
            }}
            onClick={handleRegister}
          >
            + Post New Thread
          </MDBBtn>
        </div>
      </MDBRow>
      <MDBRow className="discussion-section panel-row">
        <MDBCol md={12} style={{ padding: '0px' }}>
          <MDBRow
            style={{
              background: "#FFFFFF",
              boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <div className="thread-list--body">
              <MDBRow
                className="panelHeading"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <MDBCol md={6} >
                  <p className="customComponent-title">{title}</p>
                </MDBCol>
                <MDBCol md={6}>
                </MDBCol>
              </MDBRow>
              {console.log(filteredAllSpaMasseuse)}
              <div class="flex flex-col px-1 py-1" >
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-center border-solid border-1">
                        <thead class="border-b bg-gray-800" style={{background: "#c8175d"}}>
                          <tr>
                            <th scope="col" class="align text-left font-medium text-white px-6 py-2">
                              Threads
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-2">
                              Replies
                            </th>
                            <th scope="col" class="text-sm font-medium text-white px-6 py-2">
                              Views
                            </th>
                            <th scope="col" class="text-left font-medium text-white px-12 py-2">
                              Last post
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b">
                            <td class="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-900">1</td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Mark
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Otto
                            </td>
                            <td class="text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              @mdo
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr class="bg-white border-b">
                            <td class="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-900">1</td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Mark
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Otto
                            </td>
                            <td class="text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              @mdo
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
                <div className="thread-list--mobile">
                  {filteredAllSpaMasseuse?.map((currentValue) => (
                    <MDBRow className="thread-list-item">
                      <MDBCol md={12} className="p-2">
                        <div
                          onClick={() => handleTrendingForum(currentValue)}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="topic-title" style={{ fontSize: "16px", color: "#00008b" }}>
                            {currentValue._source.payload.masseuse.topic}
                          </span>
                        </div>
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
                  ))}
                </div>
            </div>
            <Pagination activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage} />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <br />
      {/* Model */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent style={{ marginTop: "232px" }}>
            <span className="close-button">
              <MDBBtn
                className="btn-close model-close-btn"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </span>

            <MDBModalBody style={{ padding: "" }}>

              <MDBRow>
                <MDBCol md={3}>
                  <h5 className="model-text">
                    Title<span style={{ color: "#c8175d" }}>*</span>
                  </h5>
                </MDBCol>
                <MDBCol md={9}>
                  {" "}
                  <MDBInput
                    type="text"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    label="Write a descriptive title"
                    id="model-area"
                    required
                    className="mb-3"
                  />
                </MDBCol>
                <MDBCol md={3}>
                  <h5 className="model-text">
                    Description<span style={{ color: "#c8175d" }}>*</span>
                  </h5>
                </MDBCol>
                <MDBCol md={9}>
                  <MDBTextArea
                    label=" Write a Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="model-area"
                    required
                    rows={6}
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                className="btn btn-outline btn-create-post"
                onClick={() => {
                  toggleShow();
                }}
              >
                Cancel
              </MDBBtn>
              <MDBBtn onClick={submitPost}>Post</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};
export default MostRecentDiscussion;
