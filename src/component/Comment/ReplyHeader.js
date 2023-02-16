import CommentBtn from "./CommentBtn";
import React, { useState, useEffect } from "react";
import views from "../../assets/views.svg";
const ReplyHeader = ({ commentData, isReply }) => {
    const formatTime = (timeString) => {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    };

    console.log(commentData);

    return (
        <div style={{ paddingLeft: "19px" }}>

        </div>
    );
};

export default ReplyHeader;
