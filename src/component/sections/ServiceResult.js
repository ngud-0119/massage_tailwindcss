import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/dataContext";
import {
    MDBRow,
    MDBCol,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from "mdb-react-ui-kit";
import views from "../../assets/views.svg";
import spaProfile from "../../assets/spaprofile.svg";
import locationIcon from "../../assets/locationblkIcon.svg";
import ReactStars from "react-rating-stars-component";
import { NavLink, useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/isLogins";
import TrendingSearchResult from "./TrendingSearchResult"
import Pagination from "../../accounts/component/Pagination"
import {
    getSpas,
    getMasseuse,
    getSearchOfSpaMasseuse,
    getSpasSearch,
    getMasseuseSearch,
} from "../../axiosCalls";
import { getCities } from "../../axiosCalls";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ServiceResult = ({ searchForumResult, searchResultService, activeNumber, setActiveNumber, currentPage, totalForum, setCurrentPage, forumtPerPage }) => {



    const url = baseUrl();
    const { state } = useLocation();

    const { handleChangeQuery, query } = useContext(Context);
    const [Allcity, setAllcity] = useState([]);
    const [forumResult, setForumResult] = useState([])
    const [data, setData] = useState([]);
    console.log(searchResultService)

    return (
        <>

            <MDBRow
                className="search-page"
                style={{
                    paddingLeft: "0px",
                    paddingRight: "0px"
                }}
            >

                {searchResultService.length > 0 && <>
                    <MDBCol md={12} style={{ marginBottom: "-60px" }}>
                        <MDBRow className=" mb-5">
                            <MDBCol
                                md={12}
                                style={{ marginTop: searchResultService.length === 0 ? "20%" : "20px" }}
                                className="search-page-top"
                            >
                                <>
                                    {searchResultService?.map((currentValue) => {

                                        return (
                                            <>
                                                <MDBRow style={{
                                                    paddingLeft: "38px",
                                                    paddingRight: "38px"
                                                }} className="search-result-card">
                                                    <MDBRow>

                                                        <MDBCol md={8} className="col-8">
                                                            {currentValue._source.payload.service?.logo ? (
                                                                <>
                                                                    {" "}
                                                                    <img
                                                                        src={`${url}/files/${currentValue._source.payload.service?.logo}`}
                                                                        style={{
                                                                            width: "51px",
                                                                            height: "45px",
                                                                            // borderRadius: "50%",
                                                                        }}
                                                                        alt="Logo"
                                                                    />{" "}
                                                                    &nbsp;
                                                                </>
                                                            ) : ""
                                                            }
                                                            <NavLink
                                                                to={
                                                                    currentValue._source.payload.service?.specialization
                                                                        ? "/single-masseuse?id=" + currentValue._source.payload.service.id
                                                                        : "/single-spa?id=" + currentValue._source.payload.service.id
                                                                }
                                                                className="search-title"
                                                            >
                                                                {" "}
                                                                {currentValue._source.payload.service.name}
                                                            </NavLink>
                                                            {/* <ReactStars
                              classNames="search-rating"
                              {...showrating}
                            /> */}
                                                        </MDBCol>

                                                        <MDBCol
                                                            md={4}
                                                            className="plr-0 col-4 search-header-sub"
                                                            style={{ marginTop: "25px", textAlign: "right" }}

                                                        >
                                                            <NavLink
                                                                to={
                                                                    currentValue._source.payload.service?.specialization
                                                                        ? "/single-masseuse?id=" + currentValue._source.payload.service.id
                                                                        : "/single-spa?id=" + currentValue._source.payload.service.id
                                                                }
                                                                style={{ marginRight: "-20px" }}
                                                            >
                                                                {" "}
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline btn-create-post view-detail-btn"
                                                                >
                                                                    View Details
                                                                </button>
                                                            </NavLink>
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow
                                                        style={{ paddingTop: "1%" }}
                                                        className="f-search"
                                                    >
                                                        <MDBCol md={4} className="daysCount">
                                                            {currentValue._source.payload.service.location && (
                                                                <img src={locationIcon} />
                                                            )}{" "}
                                                            {currentValue._source.payload.service.location}
                                                        </MDBCol>

                                                        <MDBCol md={6} className=" ">
                                                            <div className="viewsCount row">

                                                                {currentValue._source.payload.service.services
                                                                    ? currentValue._source.payload.service.services?.map((service) => {
                                                                        return (
                                                                            <div
                                                                                className="col-md-6 col-lg-4"
                                                                                style={{

                                                                                    marginBottom: "15px",
                                                                                }}
                                                                            >
                                                                                <span className="search_service servce_active">
                                                                                    {service}
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    })
                                                                    : currentValue._source.payload.service.specialization?.map((specialization) => {
                                                                        return (
                                                                            <div
                                                                                className="col-md-6 col-lg-4"
                                                                                style={{

                                                                                    marginBottom: "15px",
                                                                                }}
                                                                            >
                                                                                <span className="search_service servce_active">
                                                                                    {specialization}
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    })

                                                                }

                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBRow>
                                                <hr />
                                            </>
                                        );
                                    })}


                                </>

                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </>
                }

                <Pagination activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage} />


                <br />
                <br />

            </MDBRow>
        </>
    );
};
export default ServiceResult;
