import CommentBtn from "./CommentBtn";
import React, { useState, useEffect } from "react";
import "../../css/threadPost.css";
import views from "../../assets/views.svg";
const CommentHeader = ({ commentData, isReply }) => {
  const formatTime = (timeString) => {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  };

  console.log(commentData);

  return (
    <div className="comment--header">
      <span className="comment-posted-time" style={{ color: "#fff", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600" }}>
        {commentData?.createdAt.substring(0, 10)}
      </span>{" "}
      &nbsp;&nbsp;&nbsp;
      <span className="comment-posted-time" style={{ color: "#fff", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600" }}>
        {formatTime(commentData?.createdAt.substring(11, 16))}
      </span>
      &nbsp;&nbsp;&nbsp;
      {!isReply && (
        <>
          {/* <span className="viewsCount-comment">
            <img src={views} alt="eye icon" />
            &nbsp; 22 views
          </span> */}
        </>
      )}
    </div>
  );
};

export default CommentHeader;
