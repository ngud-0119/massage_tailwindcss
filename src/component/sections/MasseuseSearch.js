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

const MasseuseSearch = () => {
  const url = baseUrl();
  const { state } = useLocation();
  const [selectValue, setSelectValue] = useState("");
  const [Allcity, setAllcity] = useState([]);

  const [data, setData] = useState([]);
  const { handleMasseuseChangeQuery, masseuseQuery } = useContext(Context);
  useEffect(() => {
    getMasseuseSearch(masseuseQuery).then((res) => {
      setData(res?.data?.joinedData);
    });
    const fetchData = async () => {
      await getCities().then((res) => {
        setAllcity(res.data.data);
      });
    };

    fetchData().catch(console.error);
  }, []);

  const handleSearch = () => {
    console.log("handle search get called");
    console.log(masseuseQuery);
    getMasseuseSearch(masseuseQuery).then((res) => {
      setData(res.data.joinedData);
      console.log("res data is here", res);
    });
  };

  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      handleSearch();
    }
  };

  return (
    <>
      <MDBRow
        className="search-page"
        style={{
          background:
            "linear-gradient(179.95deg, rgba(200, 23, 93, 0.16) 6.93%, rgba(217, 217, 217, 0) 50.72%)",
        }}
      >
        <div class="input-group home-searxh secrhpage-search">
          {/* <FormControl sx={{ minWidth: 120 }} size="small">
            <Select
              name="city"
              type="search"
              labelId="demo-select-small"
              id="demo-select-small"
              value={selectValue}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
              }}
            >
              <MenuItem value="">City</MenuItem>
              {Allcity.map((city) => {
                return <MenuItem value={city.id}>{city.name}</MenuItem>;
              })}
            </Select>
          </FormControl> */}
          <input
            type="search"
            class="form-control "
            placeholder="Search here..."
            aria-label="Search"
            value={masseuseQuery}
            onChange={handleMasseuseChangeQuery}
            aria-describedby="search-addon"
            onKeyPress={handleKeypress}
            name="query"
            required
          />
          <button onClick={handleSearch} type="button" class="btn btn-outline">
            search
          </button>
        </div>

        {/* <MDBCol md={8}>
          {" "}
          Searching results for on{" "}
          {formValue.query === "" ? (
            <>{state.formValue.query}</>
          ) : (
            <>{formValue.query}</>
          )}{" "}
        </MDBCol>
        <MDBCol md={4}>
          <span className="search-sort">
            <select>
              <option>Sort By Top Rated</option>
            </select>
          </span>
        </MDBCol> */}

        <MDBCol md={12}>
          <MDBRow className=" mb-5">
            <MDBCol md={12} style={{ marginTop: "20px" }}>
              <>
                {data?.map((currentValue) => {
                  let totalRating = currentValue?.reviewratingspas?.length;
                  let totalRatingMasseuse =
                    currentValue?.reviewratingmasseuses?.length;

                  console.log(totalRating);
                  let avilRating = 0;

                  if (state.userType === "masseuse") {
                    currentValue?.reviewratingmasseuses?.map((rating) => {
                      console.log(rating);
                      avilRating = rating.rating + avilRating;
                    });
                  } else {
                    currentValue?.reviewratingspas?.map((rating) => {
                      console.log(rating);
                      avilRating = rating.rating + avilRating;
                    });
                  }

                  // console.log(totalRating, avilRating);
                  let getratingSpa = avilRating / totalRating;
                  let getratingMasseuse = avilRating / totalRatingMasseuse;
                  // console.log(totalRating, avilRating, getrating);

                  let showrating = {
                    size: 25,
                    value:
                      state.userType === "masseuse"
                        ? getratingMasseuse
                        : getratingSpa,
                    edit: false,
                    activeColor: "#C8175D",
                    isHalf: true,
                  };

                  return (
                    <>
                      <MDBRow style={{ padding: "0 0" }} className="">
                        <MDBRow>
                          <MDBCol md={8} className="col-8">
                            {currentValue.logo ? (
                              <>
                                {" "}
                                <img
                                  src={`${url}/files/${currentValue?.logo}`}
                                  style={{
                                    width: "51px",
                                    height: "51px",
                                    // borderRadius: "50%",
                                  }}
                                  alt="Logo"
                                />{" "}
                                &nbsp;
                              </>
                            ) : (
                              ""
                              // <img
                              //   src={spaProfile}
                              //   style={{
                              //     width: "51px",
                              //     height: "51px",
                              //     // borderRadius: "50%",
                              //   }}
                              //   alt="Logo"
                              // />
                            )}
                            <NavLink
                              to={
                                currentValue.specialization
                                  ? "/single-masseuse?id=" + currentValue.id
                                  : "/single-spa?id=" + currentValue.id
                              }
                              className="search-title"
                            >
                              {" "}
                              {currentValue.name}
                            </NavLink>
                            {currentValue?.spaMessauses[0] && (
                              <>
                                <p
                                  className="daysCount"
                                  style={{ marginLeft: "51px" }}
                                >
                                  {currentValue.spaMessauses[0].spa.name}
                                </p>
                              </>
                            )}

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
                                currentValue.specialization
                                  ? "/single-masseuse?id=" + currentValue.id
                                  : "/single-spa?id=" + currentValue.id
                              }
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
                            {currentValue.location && (
                              <img src={locationIcon} />
                            )}{" "}
                            {currentValue.location}
                          </MDBCol>

                          <MDBCol md={6} className=" ">
                            <div className="viewsCount row">
                              {currentValue.services
                                ? currentValue.services.map((service) => {
                                  return (
                                    <div
                                      className="col-md-6 col-lg-4"
                                      style={{
                                        // marginRight: "-40px",
                                        marginBottom: "15px",
                                      }}
                                    >
                                      <span className="search_service servce_active">
                                        {service}
                                      </span>
                                    </div>
                                  );
                                })
                                : ""}
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBRow>
                      <hr />
                    </>
                  );
                })}

                <nav aria-label="Page navigation example">
                  <MDBPagination className="mb-2">
                    <MDBPaginationItem>
                      <MDBPaginationLink href="">Previous</MDBPaginationLink>
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
              </>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </>
  );
};
export default MasseuseSearch;
