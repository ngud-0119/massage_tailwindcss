import CommentVotes from "./CommentVotes";
import CommentBtn from "./CommentBtn";
import React, { useState, useEffect } from "react";
const CommentFooter = ({
  vote,
  setVoted,
  score,
  setScore,
  updateScore,
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
  count,
  setCount,
  setUpdateComment,
  typeUser,
  userId,
}) => {
  return (
    <div className="comment--footer">
      {/* <CommentVotes
				vote={vote}
				setVoted={setVoted}
				score={score}
				setScore={setScore}
				updateScore={updateScore}
				commentData={commentData}
			/> */}

      <CommentBtn
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
  );
};

export default CommentFooter;
