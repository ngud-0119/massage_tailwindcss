import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../../context/dataContext";
import { toast } from "react-toastify";
import "../../css/threadPost.css"
import {
  MDBRow,
  MDBCol,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBInput,
  MDBTextArea,
  MDBBtn,
} from "mdb-react-ui-kit";
import ReactQuill, { Quill } from "react-quill";
import { postTrending } from "../../axiosCalls";
import { useNavigate } from "react-router-dom";
const TrendingPosts = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const editorRef = useRef(null);
  const [description, setDescription] = useState("");
  console.log(description)
  const submitPost = async () => {
    if (topic && description) {
      await postTrending(topic, description).then((res) => {
        // toast("Forum Added Successfully", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });

        navigate("/");
      });
    }
  };

  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      submitPost();
    }
  };

  return (
    <>
      <MDBRow
        className="search-page"
        style={{
          background:
            "linear-gradient(179.95deg, rgba(200, 23, 93, 0.16) 6.93%, rgba(217, 217, 217, 0) 50.72%)",
        }}
      >
        <MDBCol md={12}>
          <MDBRow className="mb-5 post-trending-thread" style={{ marginTop: "200px" }}>
            <MDBCol md={12}>
              <>
                <MDBRow>
                  <MDBCol md={2}></MDBCol>

                  <MDBCol md={1}>
                    <h5 className="model-text">
                      Title<span style={{ color: "#c8175d" }}></span>
                    </h5>
                  </MDBCol>
                  <MDBCol md={7}>
                    {" "}
                    <MDBInput
                      type="text"
                      name="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      // label="Write a descriptive title"
                      id="model-area"
                      required
                      className="mb-3"
                    />
                  </MDBCol>
                  <MDBCol md={2}></MDBCol>

                  <MDBCol md={2}></MDBCol>
                  <MDBCol md={1}>
                    {/* <h5 className="model-text">
                      Description<span style={{ color: "#c8175d" }}>*</span>
                    </h5> */}
                  </MDBCol>
                  <MDBCol md={7}>
                    {/* <MDBTextArea
                      // label=" Write a Description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="model-area"
                      required
                      rows={6}
                      onKeyPress={handleKeypress}
                    /> */}

                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      modules={TrendingPosts.modules}
                      formats={TrendingPosts.formats}
                      style={{ height: "172px" }}
                      forwardedRef={editorRef}
                    />


                  </MDBCol>
                  <MDBCol md={2}></MDBCol>
                  <br />

                  <MDBCol
                    md={10}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "70px",
                    }}
                  >
                    <MDBBtn
                      className="btn btn-outline btn-create-post"
                      style={{ marginRight: "10px" }}
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </MDBBtn>
                    <MDBBtn onClick={submitPost}>Post</MDBBtn>
                  </MDBCol>
                  <MDBCol md={2}></MDBCol>
                </MDBRow>
              </>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <p className="trending-post-bottom">
        <br />
        <br />
        <br />
        <br />
      </p>
    </>
  );
};
export default TrendingPosts;
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

TrendingPosts.modules = {
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
TrendingPosts.formats = [
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