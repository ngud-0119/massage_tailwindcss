import './reply.css'
import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/dataContext";
import { toast } from "react-toastify";
import { MDBIcon } from "mdb-react-ui-kit";
import {
  deleteSpaForumComment,
  deleteMasseuseForumComment,
} from "../../axiosCalls";
import { selectUnstyledClasses } from "@mui/base";
import { SettingsSystemDaydreamOutlined } from "@mui/icons-material";

const CommentBtn = ({
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
  const {
    setCommentOfType,
    commentOfType,
    setCommentId,
    setCommentIdOfUpdate,
  } = useContext(Context);

  let counter = false;
  const showAddComment = () => {
    // Logic that was hide the reply from user until clicked on reply button
    // counter ? setReplying(false) : setReplying(true);
    // counter = true;
    setCommentId(commentData.id);

    setCommentOfType("reply");
  };
  const handleDeleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      if (typeUser === "generic") {
        const res = await deleteSpaForumComment(commentData.id, Number(localStorage.getItem("forumId")), "generic");
        console.log(res)
        if (res.data.success) {
          toast(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCount(count + 1);
        }
      } else if (typeUser === "spa") {
        const res = await deleteSpaForumComment(commentData.id, Number(localStorage.getItem("forumId")), "SpaForum");
        if (res.data.success) {
          toast(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCount(count + 1);
        }
      } else {
        const res = await deleteMasseuseForumComment(commentData.id, Number(localStorage.getItem("forumId")), "MasseuseForum");
        if (res.data.success) {
          toast(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCount(count + 1);
        }
      }
    }
  };

  const handleUpdateComment = () => {
    setUpdateComment(commentData);
    setCommentIdOfUpdate(commentData.id);
    setCommentOfType("update");
  };

  // delete comment
  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  // edit comment
  const showEditComment = () => {
    setEditing(true);
  };

  console.log(commentData)

  return (
    <div className="comment--btn" style={{ marginLeft: "-4px" }}>
      <span>
        <button
          className={`reply-group reply-btn ${!commentData.currentUser ? "" : "display--none"
            } reply-group`}
          onClick={showAddComment}
        >
          <MDBIcon fas icon="reply" className='me-1' style={{ color: "#999", cursor:"pointer" }} id="replyicon" />
          <span id="reply-text" className='text-data' style={{fontSize:"13px", color: "#999" }}>Reply</span>
        </button>

        {commentData.userId == localStorage.getItem("userID") ||
          localStorage.getItem("userID") == 10 ? (
          <>
            <button
              className={`reply-group reply-btn ${!commentData.currentUser ? "" : "display--none"
                }`}
              onClick={handleUpdateComment}
            >
              <IconEdit id="edit-icon" style={{opacity: "0.7"}} />
              <span className="ms-1 text-data" id="reply-text" style={{fontSize:"13px", color: "#999", marginRight:"10px" }}>Edit</span>
            </button>
            <button
              className={`reply-group reply-btn ${!commentData.currentUser ? "" : "display--none"
                }`}
              onClick={handleDeleteComment}
            >
              <IconDelete id="delete-icon" style={{opacity: "0.7"}} />
              <span className="ms-1 text-data" id="reply-text" style={{fontSize:"13px", color: "#999" }}>Delete</span>
            </button>
          </>
        ) : (
          ""
        )}
      </span>

    </div>
  );
};

export default CommentBtn;
