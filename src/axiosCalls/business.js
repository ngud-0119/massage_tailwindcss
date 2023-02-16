import { axiosInstance } from "./axiosInstance";

export const getBusiness = async () => {
  let res;
  try {
    res = await axiosInstance.get("/api/admin/getbusiness");
    //console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};


export const getActiveUsers = async () => {
  let res;
  try {
    res = await axiosInstance.get("/api/getactiveusers");
    console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};

export const getNumberOfViews = async () => {
  let res;
  try {
    res = await axiosInstance.get("/api/pageviews");
    //console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};



export const hSpaBusinessesFunc = async () => {
  let res;
  try {
    res = await axiosInstance.get("/api/gethspabusinesses");
    //console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};

export const masseuseProfiles = async () => {
  let res;
  try {
    res = await axiosInstance.get("/api/getmasseuseprofiles");
    //console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};

export const getHomePages = async () => {
  let res;
  try {
    res = await axiosInstance.get("/api/admin/gethomepage");
    //console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};
