import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/dataContext";
import { toast } from "react-toastify";
import {
    deleteSpaForumComment,
    deleteMasseuseForumComment,
} from "../../axiosCalls";
const ReplyFooter = ({
    commentData,
    setDeleting,
    setDeleteModalState,
    count,
    setCount,
    setUpdateComment,
    typeUser,
    userId
}) => {
    const {
        setCommentOfType,
        commentOfType,
        setCommentId,
        setCommentIdOfUpdate,
        setReplyOfUpdate
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
        if (window.confirm("Are you sure you want to delete this reply?")) {
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
        setReplyOfUpdate(commentData);
        setCommentOfType("updateReply");
    };


    return (
        <div className="comment--btn footer-top reply-footer" style={{
            marginTop: "-12px",
            paddingBottom: "9px",
            // display: commentData.userId !== localStorage.getItem("userID") || localStorage.getItem("userID") !== 10 ? "none" : "block"  
        }}>
            <span style={{ marginLeft: "10px" }}>


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
                    <></>
                )}
            </span>

        </div>
    );
};

export default ReplyFooter;
