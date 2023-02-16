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

const Search = () => {
    const url = baseUrl();
    const { state } = useLocation();

    const { handleChangeQuery, query } = useContext(Context);
    const [Allcity, setAllcity] = useState([]);
    const [forumResult, setForumResult] = useState([])
    const [data, setData] = useState([]);
    useEffect(() => {
        if (query) {
            getSearchOfSpaMasseuse(query).then((res) => {
                setForumResult(res.data.joinedData.responses[0].hits.hits)
                setData(res.data.joinedData.responses[1].hits.hits);
            });
        }
        const fetchData = async () => {
            await getCities().then((res) => {
                setAllcity(res.data.data);
            });
        };
        fetchData().catch(console.error);
    }, []);

    const handleSearch = () => {
        getSearchOfSpaMasseuse(query).then((res) => {
            console.log(res)
            setForumResult(res.data.joinedData.responses[0].hits.hits)
            setData(res.data.joinedData.responses[1].hits.hits);
        });
    };

    const handleKeypress = (e) => {
        if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
            handleSearch();
        }
    };
    console.log(data)
    return (
        <>

            <MDBRow
                className="search-page"
                style={{
                    background:
                        "linear-gradient(179.95deg, rgba(200, 23, 93, 0.16) 6.93%, rgba(217, 217, 217, 0) 50.72%)",
                }}
            >



                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div class="input-group home-searxh secrhpage-search">

                        <input
                            value={query}
                            type="search"
                            class="form-control "
                            placeholder="Find the massage and masseuse here.."
                            aria-label="Search"
                            onChange={handleChangeQuery}
                            aria-describedby="search-addon"
                            onKeyPress={handleKeypress}
                            name="query"
                            required
                        />
                        <button onClick={handleSearch} type="button" class="btn btn-outline">
                            search
                        </button>
                    </div>
                </div>
                {forumResult.length > 0 && <>
                    <TrendingSearchResult searchForumResult={forumResult} query={query} searchResultService={data} />
                </>
                }
                {data.length > 0 && <>
                    <MDBCol md={12}>
                        <MDBRow className=" mb-5">
                            <MDBCol
                                md={12}
                                style={{ marginTop: data.length === 0 ? "20%" : "20px" }}
                            >
                                <>
                                    {data?.map((currentValue) => {

                                        // The following are the rating code, get commented.
                                        // let totalRating = currentValue?.reviewratingspas?.length;
                                        // let totalRatingMasseuse =
                                        //   currentValue?.reviewratingmasseuses?.length;

                                        // console.log(totalRating);
                                        // let avilRating = 0;

                                        // if (state?.userType === "masseuse") {
                                        //   currentValue?.reviewratingmasseuses?.map((rating) => {
                                        //     console.log(rating);
                                        //     avilRating = rating.rating + avilRating;
                                        //   });
                                        // } else {
                                        //   currentValue?.reviewratingspas?.map((rating) => {
                                        //     console.log(rating);
                                        //     avilRating = rating.rating + avilRating;
                                        //   });
                                        // }

                                        // console.log(totalRating, avilRating);
                                        // let getratingSpa = avilRating / totalRating;
                                        // let getratingMasseuse = avilRating / totalRatingMasseuse;
                                        // console.log(totalRating, avilRating, getrating);

                                        // let showrating = {
                                        //   size: 25,
                                        //   value:
                                        //     state?.userType === "masseuse"
                                        //       ? getratingMasseuse
                                        //       : getratingSpa,
                                        //   edit: false,
                                        //   activeColor: "#C8175D",
                                        //   isHalf: true,
                                        // };

                                        return (
                                            <>
                                                <MDBRow style={{ padding: "0 0" }} className="">
                                                    <MDBRow>

                                                        <MDBCol md={8} className="col-8">
                                                            {currentValue._source.payload?.logo ? (
                                                                <>
                                                                    {" "}
                                                                    <img
                                                                        src={`${url}/files/${currentValue._source.payload?.logo}`}
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
                                                                    currentValue._source.payload?.specialization
                                                                        ? "/single-masseuse?id=" + currentValue._source.payload.id
                                                                        : "/single-spa?id=" + currentValue._source.payload.id
                                                                }
                                                                className="search-title"
                                                            >
                                                                {" "}
                                                                {currentValue._source.payload.name}
                                                            </NavLink>
                                                            {/* <ReactStars
                              classNames="search-rating"
                              {...showrating}
                            /> */}
                                                        </MDBCol>

                                                        <MDBCol
                                                            md={4}
                                                            className=" plr-0 col-4"
                                                            style={{ marginTop: "25px", textAlign: "right" }}
                                                        >
                                                            <NavLink
                                                                to={
                                                                    currentValue._source.payload?.specialization
                                                                        ? "/single-masseuse?id=" + currentValue._source.payload.id
                                                                        : "/single-spa?id=" + currentValue._source.payload.id
                                                                }
                                                                style={{ marginRight: "-20px" }}
                                                            >
                                                                {" "}
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-outline btn-create-post"
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
                                                            {currentValue._source.payload.location && (
                                                                <img src={locationIcon} />
                                                            )}{" "}
                                                            {currentValue._source.payload.location}
                                                        </MDBCol>

                                                        <MDBCol md={6} className=" ">
                                                            <div className="viewsCount row">

                                                                {currentValue._source.payload.services
                                                                    ? currentValue._source.payload.services?.map((service) => {
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
                                                                    : currentValue._source.payload.specialization?.map((specialization) => {
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
                {
                    (forumResult?.length > 0 || data?.length > 0) && <>
                        <nav aria-label="Page navigation example">
                            <MDBPagination className="mb-2">
                                <MDBPaginationItem>
                                    <MDBPaginationLink href="">
                                        Previous
                                    </MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem>
                                    <MDBPaginationLink href="">1</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem>
                                    <MDBPaginationLink href="">2</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem>
                                    <MDBPaginationLink href="">3</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem>
                                    <MDBPaginationLink href="">Next</MDBPaginationLink>
                                </MDBPaginationItem>
                            </MDBPagination>
                        </nav>
                        <br />
                        <br />
                        <br />
                        <br />
                    </>
                }



            </MDBRow>
        </>
    );
};
export default Search;
