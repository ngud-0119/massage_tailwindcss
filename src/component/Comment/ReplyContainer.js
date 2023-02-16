import Reply from "./Reply";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../../context/dataContext";
import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/threadPost.css";
import { postForumComment, postForumCommentMasseuse } from "../../axiosCalls";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";
import { isLogin } from "../../utils/isLogins";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

const ReplyContainer = ({
  commentData,
  updateScore,
  commentPostedTime,
  addReply,
  editComment,
  deleteComment,
  setDeleteModalState,
  count,
  setCount,
  typeUser,
  userId,
}) => {
  const [comment, setComment] = useState("");
  const { commentOfType } = useContext(Context);

  const editorRef = useRef(null);
  const navigate = useNavigate();
  const clickHandler = async () => {

    if (!isLogin()) {
      localStorage.setItem("previousPage", window.location.pathname);     
      navigate("/login");
    } else {
        
    if (
      comment.substring(3, comment.length - 4) === "" ||
      comment.substring(3, comment.length - 4) === " "
    )
      return;

    if (typeUser === "generic") {
      const genericForumData = JSON.stringify({
        mediaLink: "",
        comment: comment,
        userId: localStorage.getItem("userID"),
        forumId: Number(localStorage.getItem("forumId")),
        elasticID: "generic"
      });

      const res = await postForumComment(genericForumData);
      if (res.data.success) {
        setComment("");
        setCount(count + 1);
      }
    }
    else if (typeUser === "spa") {
      const spaForumData = JSON.stringify({
        mediaLink: "",
        comment: comment,
        userId: localStorage.getItem("userID"),
        forumId: Number(localStorage.getItem("forumId")),
        elasticID: "SpaForum"
      });
      const res = await postForumComment(spaForumData);
      if (res.data.success) {
        // toast(res.data.message, {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });

        setComment("");
        setCount(count + 1);
      }
    } else {
      const spaForumData = JSON.stringify({
        mediaLink: "",
        comment: comment,
        userId: localStorage.getItem("userID"),
        forumId: Number(localStorage.getItem("forumId")),
        elasticID: "MasseuseForum"
      });
      const res = await postForumCommentMasseuse(spaForumData);
      if (res.data.success) {
        toast.success(res.data.message);
        setComment("");
        setCount(count + 1);
      }
    }
  }
  };

  return (
    <div className="reply-container">
      {commentData?.map((data) => (
        <Reply
          key={data.id}
          commentData={data}
          updateScore={updateScore}
          commentPostedTime={commentPostedTime}
          addNewReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
          count={count}
          setCount={setCount}
          typeUser={typeUser}
          userId={userId}
        />
      ))}

      {/* Call your reactquil here */}
      <MDBRow>
        <MDBCol md={4} style={{ width: "100%" }}>
         
            <>
              {commentOfType === "comment" && (
                <>
                  <div className="add-comment">
                    <div className="profile-pic"></div>
                    <ReactQuill
                      theme="snow"
                      value={comment}
                      onChange={setComment}
                      modules={ReplyContainer.modules}
                      formats={ReplyContainer.formats}
                      forwardedRef={editorRef}
                      className="forumComment"
                    />
                    <br />
                    <MDBBtn
                      className="add-btn btn"
                      onClick={clickHandler}
                      style={{ marginTop: "30px"}}
                    >
                      Post
                    </MDBBtn>{" "}
                  </div>
                </>
              )}
            </>
         
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default ReplyContainer;

const imageHandler = (a) => {
  console.log("the image function get called");
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    console.log(file);
    // file type is only image.
    if (/^image\//.test(file.type)) {
      // saveToServer(file);
    } else {
      console.warn("You could only upload images.");
    }
  };
};

ReplyContainer.modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "blockquote"],

      ["link", "image", "video"],
      ["clean"],
    ],
    // handlers: {
    //   image: imageHandler,
    // },
  },
};
ReplyContainer.formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
