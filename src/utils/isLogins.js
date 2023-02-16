import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const baseUrl = () => {
  return "https://bodyslides.ca";
  // return "http://localhost:4000";
};

export const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
};
export const isLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("location");
  localStorage.removeItem("userName");
  localStorage.removeItem("phoneNumber");
  localStorage.removeItem("email");
  localStorage.removeItem("userID");
  // window.location.reload(true);
  window.location.href = "/";
};
