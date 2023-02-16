import React, { useState } from "react";
import { baseUrl } from "../utils/isLogins";
const EditImagePreview = ({ editImgurl }) => {
  const [preview, setPreview] = useState(null);
  const url = baseUrl();
  return (
    <div>
      <img
        src={`${url}/files/${editImgurl}`}
        alt="preview"
        width="150px"
        height="150px"
        style={{
          // borderRadius: "50%",
          marginBottom: "13px",
        }}
      />
    </div>
  );
};
export default EditImagePreview;
