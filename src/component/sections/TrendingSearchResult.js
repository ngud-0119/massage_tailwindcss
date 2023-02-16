import React, { useState, useEffect } from "react";
import { isLogin } from "../../utils/isLogins";
import ServiceResult from "./ServiceResult"
import {
    MDBRow,
    MDBCol,

} from "mdb-react-ui-kit";

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import views from "../../assets/views.svg";
import arrow from "../../assets/icons/arrow.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { getSpaMasseuse, postTrending } from "../../axiosCalls";
import IconDelete from "../../assets/images/icon-delete.svg";
import Parser from "html-react-parser";

const TrendingSearchResult = ({ searchForumResult, query, searchResultService,
    activeNumber, setActiveNumber, currentPage, totalForum, setCurrentPage, forumtPerPage
}) => {
    const navigate = useNavigate();
    const [basicModal, setBasicModal] = useState(false);
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");

    const [searchValue, setSearchValue] = useState("");


    const spaTime = (date) => {
        const currentDate = new Date();
        const postDate = new Date(date);

        const result = currentDate.getTime() - postDate.getTime();

        const finalResult = Math.ceil(result / (1000 * 3600 * 24));

        return finalResult;
    };

    function formatTime(timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }

    const handleTrendingForum = (currentValue) => {
        if (currentValue._source.payload.forumtype === "generic") {
            navigate("/generic-thread", { state: { singleSpa: currentValue._source.payload.masseuse, isTrending: true } });
        } else if (currentValue._source.payload.forumtype === "SpaForum") {

            navigate("/single-spa?id=" + currentValue._source.payload.masseuse.spaId, { state: { singleSpa: currentValue._source.payload.masseuse, isTrending: true } });

        } else {
            navigate("/single-masseuse?id=" + currentValue._source.payload.masseuse.masseuseId, { state: { singleSpa: currentValue._source.payload.masseuse, isTrending: true } });
        }

    };



    return (
        <>

            <MDBRow className="discussion-section panel-row" style={{
                padding: "22px 0px 0px 0px",
                marginBottom: "22px"
            }}>
                <MDBCol md={12}>
                    <MDBRow
                        style={{

                            background: "#FFFFFF",
                            boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
                        }}
                    >
                        <MDBCol md={12} className="panel-head">
                            <MDBRow
                                className="panelHeading"
                                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, lineHeight: "12px" }}
                            >
                                <MDBCol md={6}>
                                    <p className="customComponent-title search-result-text" style={{ fontSize: "22px" }}>Search Result for {query}</p>
                                </MDBCol>
                                <MDBCol md={6}>
                                </MDBCol>
                            </MDBRow>
                            <br />
                            {searchForumResult?.map((currentValue) => (
                                <>
                                    <MDBRow className="mostRecentDiscussion-div">
                                        <MDBRow style={{ paddingTop: "1%" }}>
                                            <MDBCol md={12} className="flex daysCount-flex" style={{ marginTop: "-10px" }}>
                                                <p

                                                    onClick={() => handleTrendingForum(currentValue)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className="comment-heading">
                                                        {currentValue._source.payload.masseuse.topic}
                                                    </span>
                                                </p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <div className="daysCount mt-auto"
                                                    style={{ paddingBottom: "19px" }}
                                                >
                                                    {currentValue._source.payload.masseuse.createdAt.substring(0, 10)}{" "}
                                                    &nbsp;&nbsp;&nbsp;
                                                    {formatTime(currentValue._source.payload.masseuse.createdAt.substring(11, 16))}
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol md={8}>
                                                <p>{Parser(currentValue._source.payload.masseuse.description)}</p>
                                            </MDBCol>
                                            <MDBCol md={2} className="right plr-0 col-6">
                                                <p>


                                                    <span className="viewsCount-comment" onClick={() => handleTrendingForum(currentValue)} style={{ cursor: "pointer" }}>
                                                        <img src={views} alt="eye icon" />
                                                        &nbsp;&nbsp; <b> {currentValue._source.payload.masseuse.views} views </b>
                                                    </span>
                                                </p>
                                            </MDBCol>
                                            <MDBCol md={2} className="right plr-0 col-6">
                                                <p style={{ cursor: "pointer" }} onClick={() => handleTrendingForum(currentValue)}>
                                                    <b className="commentCount">

                                                        {currentValue._source.payload.masseuse.no_comments + " "}
                                                        Comments
                                                    </b>
                                                </p>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol md={6}>
                                                <span className="daytime">
                                                    {spaTime(currentValue._source.payload.masseuse.createdAt)}{" "}
                                                    {spaTime(currentValue._source.payload.masseuse.createdAt) === 1
                                                        ? "day"
                                                        : "days"}{" "}
                                                    ago
                                                </span>
                                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;

                                                <span
                                                    onClick={() => handleTrendingForum(currentValue)}
                                                >
                                                    <img
                                                        style={{ cursor: "pointer" }}
                                                        src={commentIcon}
                                                        alt="comment icon"
                                                        className="chatIcon"
                                                    />
                                                </span>
                                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                                <span

                                                >
                                                    Type : {currentValue._source.payload.forumtype === "generic" && <>
                                                        Generic Forum
                                                    </>}
                                                    {currentValue._source.payload.forumtype === "SpaForum" && <>
                                                        Spa Forum
                                                    </>}
                                                    {currentValue._source.payload.forumtype === "MasseuseForum" && <>
                                                        Massesue Forum
                                                    </>}
                                                </span>
                                            </MDBCol>
                                        </MDBRow>


                                    </MDBRow>
                                    <hr />
                                </>
                            ))}
                            <ServiceResult searchForumResult={searchForumResult} searchResultService={searchResultService} activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage} />
                        </MDBCol>

                    </MDBRow>
                </MDBCol>
            </MDBRow>


        </>
    );
};
export default TrendingSearchResult;
