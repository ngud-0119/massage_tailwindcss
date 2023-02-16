import { axiosInstance } from "./axiosInstance";
import { toast } from "react-toastify";

export const getCity = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/cities/${id}`);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};
export const getCities = async () => {
  let res;
  try {
    res = axiosInstance.get("/api/cities/all");
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const getSpas = async () => {
  let res;
  try {
    // res = axiosInstance.get("/api/spa/services/all");
    res = axiosInstance.get("/api/spa/servicesbyUser/all");
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};
export const getSpasSearch = async (query) => {
  let res;
  try {
    res = axiosInstance.get(`/api/getsearchSpa/${query}`);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};
export const getsingalSpa = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/spa/services/${id}`);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const spaChildId = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/spa/getSpaChild/${id}`);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};
export const deleteSpa = async (id) => {
  let res;
  try {
    res = axiosInstance.delete(`/api/spa/services/${id}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};
export const addSpa = async (
  name,
  images,
  phoneNo,
  webiste,
  hourOfOpertaion,
  service,
  cityId,
  location,
  comment,
  email,
  logourl
) => {
  let res;

  var data = JSON.stringify({
    name: name,
    image: images,
    phone: phoneNo,
    website: webiste,
    hourOfOpertaion: hourOfOpertaion,
    services: service,
    city: cityId,
    location: location,
    comment: comment,
    email: email,
    logo: logourl,
    elasticID: "Spa"
  });

  try {
    res = axiosInstance.post("/api/spa/services", data);
  } catch (error) {
    console.log("error", error.response);
  }

  return res ? res : "";
};

export const editSpa = async (
  id,
  name,
  images,
  phoneNo,
  webiste,
  hourOfOpertaion,
  cityId,
  location,
  service,
  comment,
  email,
  logourl
) => {
  let res;

  var data = JSON.stringify({
    id: id,
    name: name,
    image: images,
    phone: phoneNo,
    website: webiste,
    hourOfOpertaion: hourOfOpertaion,
    city: cityId,
    location: location,
    services: service,
    comment: comment,
    email: email,
    logo: logourl,
    elasticID: "Spa"
  });
  console.log(data);
  try {
    res = axiosInstance.put(`/api/spa/services/${id}`, data);
  } catch (error) {
    console.log("error", error.response);
  }

  return res ? res : "";
};

export const sendAdvertisementData = async (formData) => {
  let res;

  try {
    res = await axiosInstance.post("/api/sendadvertiseemail", formData);
    console.log(res);
  } catch (error) {
    console.log("error", error.response);
  }

  return res ? res : "";
};

export const uploadImages = async (images) => {
  let res;

  try {
    res = await axiosInstance.post("/api/upload-image", images);
    console.log(res);
  } catch (error) {
    console.log("error", error.response);
  }

  return res ? res : "";
};

export const spaRecentDiscussion = async (spaid, topic, des) => {
  let res;
  console.log(spaid)
  const data = JSON.stringify({
    topic: topic,
    userId: localStorage.getItem("userID"),
    spaId: spaid,
    description: des,
    elasticID: "SpaForum"
  });

  try {
    res = axiosInstance.post("/api/forum/spa", data);
  } catch (err) {
    console.log("error", err.response);
  }
  return res ? res : "";
};
export const postTrending = async (topic, des) => {
  let res;
  const data = JSON.stringify({
    topic: topic,
    userId: localStorage.getItem("userID"),
    description: des,
    elasticID: "generic",
    comments: []
  });

  try {
    res = axiosInstance.post("/api/forum/addgenericforum", data);
  } catch (err) {
    console.log("error", err.response);
  }
  return res ? res : "";
};

export const getSpaForum = async () => {
  let res;
  try {
    res = axiosInstance.get(`/api/forum/spa`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const getSpaForumIndividual = async (id, firstForumIndex, forumtPerPage) => {
  let res;
  try {
    res = axiosInstance.get(`/api/forum/spa/${id}/all`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const getSpaForumRating = async () => {
  let res;
  try {
    res = axiosInstance.get(`/api/spa/reviewrating`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const getSpaForumRatingIndividual = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/spa/reviewrating/${id}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const postSpaForumRating = async (data) => {
  let res;
  try {
    res = axiosInstance.post(`/api/spa/reviewrating`, data);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const getAllSpaForum = async (firstForumIndex, forumtPerPage) => {
  let res;
  try {
    res = axiosInstance.get(`/api/getspamasseuseforum/${firstForumIndex}/${forumtPerPage}/SpaForum`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};
export const deleteSpaForumComment = async (id, forumID, typeForum) => {
  let res;
  try {
    res = axiosInstance.delete(`/api/comment/spa/${id}/${forumID}/${typeForum}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};
export const updateSpaComment = async (id, data) => {
  let res;
  try {
    res = axiosInstance.put(`/api/comment/spa/${id}`, data);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

// export const getAllSpaForum = async (page, size) => {
//   let res;
//   try {
//     res = axiosInstance.get(`/api/forum/spa?page=${page}&size=${size}`);
//   } catch (error) {
//     console.log(error);
//   }
//   return res ? res : "";
// };

// Bulk deletion of all Spa
export const bulkDeletionSpa = async (arraysOfIds) => {
  try {
    const data = JSON.stringify({ ids: arraysOfIds });
    console.log(data);
    return await axiosInstance.post(`/api/multiple/delete/spa`, data);
  } catch (error) {
    return error;
  }
};

// get comment of single forum spa
export const getSpaComment = async (id) => {
  try {
    return await axiosInstance.get(`/api/comment/spa/${id}`);
  } catch (error) {
    return error;
  }
};

// get comment of single forum spa
export const deleteSpaForum = async (id, typeForum) => {
  try {
    return await axiosInstance.delete(`/api/forum/spa/${id}/${typeForum}`);
  } catch (error) {
    return error;
  }
};

// get forum Detail of single forum spa
export const ForumDetail = async (id, typeForum) => {
  try {
    return await axiosInstance.get(`/api/forum/updateviews/${id}/${typeForum}`);
  } catch (error) {
    return error;
  }
};

// post comment of forum and reply
export const postForumReply = async (data) => {
  try {
    return await axiosInstance.post(`/api/comment/spa`, data);
  } catch (error) {
    return error;
  }
};

// get comment of single forum spa
export const postForumComment = async (data) => {
  try {
    return await axiosInstance.post(`/api/comment/spa`, data);
  } catch (error) {
    return error;
  }
};

// get forum of spa and masseuse
export const getSpaMasseuse = async (firstForumIndex, forumtPerPage) => {
  try {
    console.log(firstForumIndex, forumtPerPage)
    return await axiosInstance.get(`/api/getforums/${firstForumIndex}/${forumtPerPage}`);
  } catch (error) {
    return error;
  }
};
