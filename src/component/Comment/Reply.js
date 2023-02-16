import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";

import AddComment from "./AddComment";
import UpdateComment from "./UpdateComment";
import DeleteModal from "./DeleteModal";
import CommentVotes from "./CommentVotes";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";
import { MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Reply = ({
  commentData,
  commentPostedTime,
  updateScore,
  addNewReply,
  editComment,
  deleteComment,
  setDeleteModalState,
  count,
  setCount,
  typeUser,
  userId,
}) => {
  const [replying, setReplying] = useState(true);
  const [time, setTime] = useState("");
  const [vote, setVoted] = useState(false);
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);
  const [updatComment, setUpdateComment] = useState(null);

  // get time from comment posted
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();
  var differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
    localStorage.setItem("voteState", vote);
  }, [differenceInTime, commentPostedTime, vote]);

  // adding reply
  const addReply = (newReply) => {
    addNewReply(newReply);
    setReplying(false);
  };

  //   console.log(commentData);

  const commentContent = () => {
    const text = commentData.comment.trim().split(" ");
    const firstWord = text.shift().split(",");

    console.log(commentData.comment);

    return (
      <div className="comment-content">
        <span
          className="replyingTo"
          style={{ color: " #322d2d", fontSize: "16px" }}
        >
          {Parser(commentData.comment)}
        </span>
      </div>
    );
  };

  const updateComment = () => {
    editComment(content, commentData.id, "reply");
    setEditing(false);
  };

  // delete comment
  const deleteReply = () => {
    deleteComment(commentData.id, "reply");
    setDeleting(false);
  };

  const formatTime = (timeString) => {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  };

  return (
    <div className={`comment-container`} style={{ borderBottom: "solid 1px #e2e2e2" }}>
      {/* {updatComment ? (
        <UpdateComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData?.user?.userName}
          count={count}
          setCount={setCount}
          typeUser={typeUser}
          commentData={updatComment}
          setUpdateComment={setUpdateComment}
        />
      ) : ( */}
        <div className="comment--body">
          <CommentHeader commentData={commentData} />
          <div style={{ display: 'flex' }}>
            <div style={{ backgroundColor:"#f6f7f8", width: 250 }} className="p-3 thread-info">
              <div>
                <div>
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" className="shadow-4 mb-2" alt="Avatar" width={120} />
                </div>
                <p style={{ marginBottom:'0px', fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                  {commentData?.user?.userName} 
                </p>
              </div>
              <hr />
              <div padding="auto" width="100%">
                <MDBRow>
                  <span>
                    <MDBIcon far icon="calendar" className="me-2 mb-2"/>
                    Sep 6, 2012
                  </span>
                </MDBRow>
                <MDBRow>
                  <span>
                    <MDBIcon fas icon="file" className="me-2 mb-2" />
                    1754 posts
                  </span>
                </MDBRow>
                <MDBRow>
                  <span>
                    <MDBIcon fas icon="thumbs-up" className="me-2 mb-2" />
                    208 upvotes
                  </span>
                </MDBRow>
                <MDBRow>
                  <span>
                    <MDBIcon fas icon="map-marker-alt" className="me-2 mb-2" />
                    Toronto, ON
                  </span>
                </MDBRow>
              </div>
            </div>
            <div className="p-2 w-100 d-flex flex-column justify-content-between">
              <div className="user-data">
                <div className="me-3">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" className="shadow-4" alt="Avatar" width={60} />
                </div>
                <div className="mt-2">
                  <span style={{ textAlign:"left", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                    {commentData?.user?.userName}
                  </span>
                  <br/>
                  <span style={{ fontFamily: "Verdana,Arial,sans-serif", fontSize:"12px" }}>
                    {commentData?.createdAt.substring(0, 10)} &nbsp;&nbsp;&nbsp;
                    {formatTime(commentData?.createdAt.substring(11, 16))}
                  </span>
                </div>
              </div>
              <div>
              <div className="comment">
                <div className="comment--body">
                  <div className="d-flex flex-column justify-content-between">
                    <span className="username mb-4 mt-1" style={{ color: "#3B71CA", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                      {commentData?.user?.userName} <span style={{color: "rgb(70, 58, 58)", fontFamily: "Verdana,Arial,sans-serif", fontsize:"14px", fontWeight:"400"}}><i>wrote:</i></span>
                    </span>
                    {commentContent()}
                  </div>
                  {editing && (
                    <button className="update-btn" onClick={updateComment}>
                      update
                    </button>
                  )}
                </div>
              </div>
              {replying && (
                <AddComment
                  buttonValue={"reply"}
                  commentData={commentData}
                  addComments={addReply}
                  replyingTo={commentData?.user?.email}
                  count={count}
                  setCount={setCount}
                  typeUser={typeUser}
                  userId={userId}
                  setDeleting={setDeleting}
                  setDeleteModalState={setDeleteModalState}
                  setUpdateComment={setUpdateComment}
                />
              )}
              {updatComment ? (
                <UpdateComment
                  buttonValue={"reply"}
                  addComments={addReply}
                  replyingTo={commentData?.user?.userName}
                  count={count}
                  setCount={setCount}
                  typeUser={typeUser}
                  commentData={updatComment}
                  setUpdateComment={setUpdateComment}
                />
              ): <></>}
              </div>
              <MDBRow>
                <div className="d-flex justify-content-between ps-3"> 
                  <div className="d-flex jutify-content-inherit">
                    <div className="me-2 like-count">+28</div>
                    <MDBIcon fas icon="thumbs-up" id="thumicon" />
                  </div>
                  <CommentFooter
                    vote={vote}
                    setVoted={setVoted}
                    score={score}
                    setScore={setScore}
                    updateScore={updateScore}
                    commentData={commentData}
                    setReplying={setReplying}
                    setDeleting={setDeleting}
                    setDeleteModalState={setDeleteModalState}
                    setEditing={setEditing}
                    count={count}
                    setCount={setCount}
                    setUpdateComment={setUpdateComment}
                    typeUser={typeUser}
                    userId={userId}
                  />
                </div>
              </MDBRow>
            </div>
          </div>
        </div>

      {/* {commentData?.Replies?.map((reply) => (
        <Reply
          key={reply.id}
          commentData={reply}
          commentPostedTime={commentPostedTime}
          addReply={addReply}
        />
      ))} */}


    </div>
  );
};

export default Reply;
