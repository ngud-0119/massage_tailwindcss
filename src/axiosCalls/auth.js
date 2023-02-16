import { axiosInstance } from "./axiosInstance";
import axios from "axios";
import { useEffect, useState } from "react";
import { ResetTvRounded } from "@mui/icons-material";
import { toast } from "react-toastify";

// Auth Apis

export const updateProfile = async (
  email,
  password,
  location,
  username,
  phoneNo
) => {
  let res;
  try {
    //  Body
    var data = JSON.stringify({
      email: email,
      password: password,
      location: location,
      userName: username,
      phoneNumber: phoneNo,
    });

    //  object axios
    res = await axiosInstance.put("/api/update-profile", data);
    console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};

export const loginApi = async (email, password) => {
  let res;
  try {
    //  Body
    var data = JSON.stringify({
      email: email,
      password: password,
    });
    console.log(email, password);

    //  object axios
    res = await axiosInstance.post("/api/login", data);
    console.log("error", res);
  } catch (err) {
    res = err.response;
    console.log(err.response);
  }

  return res ? res : "";
};

export const emailApi = (email, setVerifyMessage) => {
  var data = JSON.stringify({
    email: email,
  });

  axiosInstance
    .post("/api/send-email", data)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));

      const { data } = response;

      console.log(data);
      const result = JSON.stringify(response.data.data);
      setVerifyMessage(
        "A link has been sent an email to your email address for verification. Click the link in your inbox to complete sign up"
      );

      console.log(response.data.data.email);
      return response;
    })
    .catch(function (error) {
      toast.error(error.response.data.message, { theme: "colored" });
      console.log(error);
      return error;
    });
};

export const forgotApi = async (email) => {
  let res;
  try {
    const data = JSON.stringify({
      email: email,
    });
    res = axiosInstance.post(`/api/forgot-password/`, data);
    console.log(res);
  } catch (error) {
    console.log("error", error.response);
    toast.error(error.response.data.message, { theme: "colored" });
  }
  return res ? res : "";
};

export const verifyCode = async (email, code) => {
  let res;
  try {
    const data = JSON.stringify({
      email: email,
      code: code,
    });
    res = axiosInstance.post(`/api/verify-code/`, data);
    console.log(res);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const updatePassword = async (email, password) => {
  let res;
  try {
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    res = axiosInstance.post(`/api/update-password/`, data);
    console.log(res);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const signupApi = async (username, password, email, location) => {
  let res;
  try {
    var data = JSON.stringify({
      userName: username,
      email: email,
      password: password,
      location: location,
    });

    res = axiosInstance.post("/api/sign-up", data);
    console.log(res);
  } catch (error) {
    console.log("error", error);
  }

  return res ? res : "";
};

export const TokenVerify = async (token) => {
  let res;
  try {
    res = axiosInstance.get(`/api/verifyToken/${token}`);
    console.log(res);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};

export const getSingleUser = async (id) => {
  let res;
  try {
    res = axiosInstance.get(`/api/getSingleUser/${id}`);
    console.log(res);
  } catch (error) {
    console.log("error", error.response);
  }
  return res ? res : "";
};
