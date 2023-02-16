import React, { useState } from "react";
import ReplyHeader from "./ReplyHeader";
import ReplyFooter from "./ReplyFooter";
import Parser from "html-react-parser";
const ReplyOfComment = ({ commentData,
  setDeleting,
  setDeleteModalState,

  count,
  setCount,
  setUpdateComment,
  typeUser,
  userId }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [isReply, setIsReply] = useState(true);
  const commentContent = () => {
    const text = commentData.comment.trim().split(" ");
    const firstWord = text.shift().split(",");

    return !editing ? (
      <div className="comment-content">
        <p className="replyingTo" style={{
          color: "rgb(70 58 58)",
          fontSize: "17px",
          paddingLeft: "0px"
        }}>{Parser(commentData.comment)}</p>

      </div >
    ) : (
      <textarea
        className="content-edit-box"
        value={commentData.comment}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    );
  };

  console.log(commentData)

  return (
    <div
      style={{
        marginLeft: "8px"
        // backgroundColor: "#ede5e5",
        // borderLeft: "10px solid #7b96a9",
        // paddingTop: "4px",
        // paddingbottom: "6px"
      }}
    >
      <ReplyHeader isReply={isReply} commentData={commentData} />
      {commentContent()}
      <ReplyFooter commentData={commentData}

        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}

        count={count}
        setCount={setCount}
        setUpdateComment={setUpdateComment}
        typeUser={typeUser}
        userId={userId} />

    </div>
  );
};

export default ReplyOfComment;
