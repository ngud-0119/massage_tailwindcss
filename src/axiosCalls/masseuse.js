import { axiosInstance } from "./axiosInstance";

export const getSpecficMasseuse = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/masseuse/services/${id}`);

  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const getMasseuse = async () => {
  let res;
  try {
    // res = axiosInstance.get("/api/masseuse/services/all");
    res = axiosInstance.get("/api/masseuse/servicesbyUser/all");
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const getMasseuseSearch = async (query) => {
  let res;
  try {
    res = axiosInstance.get(`/api/getsearchMasseuse/${query}`);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const getSearchOfSpaMasseuse = async (query, firstForumIndex, forumtPerPage) => {
  let res;
  try {
    res = axiosInstance.get(`/api/searchforumspamasseuse/${firstForumIndex}/${forumtPerPage}/${query}`);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const addMasseuseApi = async (
  name,
  images,
  phoneNo,
  webiste,
  hourOfOpertaion,
  cityId,
  location,
  specialization,
  instagram,
  facebook,
  twitter,
  comment,
  email,
  logourl,
  spaParentId
) => {
  let res;
  var data = JSON.stringify({
    name: name,
    specialization: specialization,
    instagram: instagram,
    facebook: facebook,
    twitter: twitter,
    image: images,
    phone: phoneNo,
    website: webiste,
    hourOfOpertaion: hourOfOpertaion,
    city: cityId,
    location: location,
    comment: comment,
    email: email,
    logo: logourl,
    spaId: spaParentId,
    elasticID: "Masseuse"
  });
  console.log(data);
  try {
    res = axiosInstance.post("/api/masseuse/services", data);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

// get forum Detail of single forum masseuse
export const ForumDetailMasseuse = async (id, typeForum) => {
  try {
    return await axiosInstance.get(`/api/forum/updateviews/${id}/${typeForum}`);
  } catch (error) {
    return error;
  }
};

export const deleteMasseuseForumComment = async (id, forumID, typeForum) => {
  let res;
  try {
    res = axiosInstance.delete(`/api/comment/spa/${id}/${forumID}/${typeForum}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const updateMasseuseComment = async (id, data) => {
  let res;
  try {
    res = axiosInstance.put(`/api/comment/masseuse/${id}`, data);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const deleteMasseuse = async (id) => {
  let res;
  try {
    res = axiosInstance.delete(`/api/masseuse/services/${id}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const getAllMasseuseForum = async (firstForumIndex, forumtPerPage) => {
  let res;
  try {
    res = axiosInstance.get(`/api/getspamasseuseforum/${firstForumIndex}/${forumtPerPage}/MasseuseForum`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const postMasseuseForumRating = async (data) => {
  let res;
  console.log(data);
  try {
    res = axiosInstance.post(`/api/masseuse/reviewrating`, data);
  } catch (error) {
    console.log(error);
  }

  return res ? res : "";
};

export const getMasseuseaForumRatingIndividual = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/masseuse/reviewrating/${id}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const masseuseRecentDiscussion = async (masseuseid, topic, des) => {
  let res;
  console.log(masseuseid)
  const data = JSON.stringify({
    topic: topic,
    userId: localStorage.getItem("userID"),
    masseuseId: masseuseid,
    description: des,
    elasticID: "MasseuseForum"
  });

  try {
    res = axiosInstance.post("/api/forum/spa", data);
  } catch (err) {
    console.log("error", err.response);
  }
  return res ? res : "";
};

export const getMasseuseForumIndividual = async (id, firstForumIndex, forumtPerPage) => {
  let res;
  try {
    res = axiosInstance.get(`/api/forum/masseuse/${id}/all`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

export const getsingalMasseuse = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/masseuse/services/${id}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};
export const fetchMasseuseParant = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/masseuse/getMasseuseParant/${id}`);
  } catch (error) {
    console.log(error);
  }
  return res ? res : "";
};

// Bulk deletion of all masseuse
export const bulkDeletionMasseuse = async (arraysOfIds) => {
  try {
    const data = JSON.stringify({ ids: arraysOfIds });
    console.log(data);
    return await axiosInstance.post(`api/admin/multiple/delete/masseuse`, data);
  } catch (error) {
    return error;
  }
};

// edit masseuse
export const editMasseuseApi = async (
  id,
  name,
  images,
  phoneNo,
  webiste,
  hourOfOpertaion,
  cityId,
  userId,
  location,
  specialization,
  instagram,
  facebook,
  twitter,
  comment,
  email,
  logourl,
  spaParentId,
  oldSpaParentId
) => {
  let res;

  console.log(oldSpaParentId)
  console.log(spaParentId)
  var data = JSON.stringify({
    id: id,
    name: name,
    specialization: specialization,
    instagram: instagram,
    facebook: facebook,
    twitter: twitter,
    image: images,
    phone: phoneNo,
    website: webiste,
    hourOfOpertaion: hourOfOpertaion,
    city: cityId,
    location: location,
    services: [1, 2],
    comment: comment,
    userId: userId,
    email: email,
    logo: logourl,
    changed_spaId: spaParentId,
    spaId: oldSpaParentId ? oldSpaParentId : spaParentId,
    elasticID: "Masseuse"
  });

  console.log(data);

  try {
    res = axiosInstance.put(`/api/masseuse/services/${id}`, data);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

// get comment of single forum masseuse
export const getMasseuseComment = async (id) => {
  try {
    return await axiosInstance.get(`/api/comment/masseuse/${id}`);
  } catch (error) {
    return error;
  }
};

// delete masseuse forum
export const deleteMasseuseForum = async (id, typeForum) => {
  try {
    return await axiosInstance.delete(`/api/forum/spa/${id}/${typeForum}`);
  } catch (error) {
    return error;
  }
};

// post comment of forum and reply
export const postForumReplyMasseuse = async (data) => {
  try {
    return await axiosInstance.post(`/api/comment/masseuse`, data);
  } catch (error) {
    return error;
  }
};

// get comment of single forum spa
export const postForumCommentMasseuse = async (data) => {
  try {
    return await axiosInstance.post(`/api/comment/masseuse`, data);
  } catch (error) {
    return error;
  }
};
