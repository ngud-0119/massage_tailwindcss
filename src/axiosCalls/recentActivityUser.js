import { axiosInstance } from "./axiosInstance";

export const getRecentActivityUser = async () => {
  let res;
  try {
    res = await axiosInstance.get("/api/useractivity");
    //console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};
