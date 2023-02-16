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

const Search = () => {
  const url = baseUrl();
  const { state } = useLocation();

  const { handleChangeQuery, query, setIsSearchPage } = useContext(Context);
  const [Allcity, setAllcity] = useState([]);
  const [forumResult, setForumResult] = useState([])
  const [serviceResult, setServiceResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const [forumtPerPage, setForumPerPage] = useState(8)
  const [totalForum, setTotalForum] = useState(0)
  const [activeNumber, setActiveNumber] = useState(1);
  let lastForumtIndex;
  let firstForumIndex;

  useEffect(() => {
    if (query) {
      if (currentPage === 0) {
        firstForumIndex = currentPage
        lastForumtIndex = currentPage
      } else {
        lastForumtIndex = currentPage * forumtPerPage
        firstForumIndex = lastForumtIndex - forumtPerPage
      }

      getSearchOfSpaMasseuse(query, firstForumIndex, forumtPerPage).then((res) => {
        setForumResult(res.data.joinedData.responses[0].hits.hits)
        setServiceResult(res.data.joinedData.responses[1].hits.hits);
        setTotalForum(res.data.joinedData.responses[0].hits.total.value + res.data.joinedData.responses[1].hits.total.value)
      });
    }
    const fetchData = async () => {
      await getCities().then((res) => {
        setAllcity(res.data.data);
      });
    };
    fetchData()
    setIsSearchPage(true)
  }, [currentPage]);
  const handleSearch = () => {
    if (currentPage === 0) {
      firstForumIndex = currentPage
      lastForumtIndex = forumtPerPage
    } else {
      lastForumtIndex = currentPage * forumtPerPage
      firstForumIndex = lastForumtIndex - forumtPerPage
    }
    getSearchOfSpaMasseuse(query, firstForumIndex, forumtPerPage).then((res) => {
      setForumResult(res.data.joinedData.responses[0].hits.hits)
      setServiceResult(res.data.joinedData.responses[1].hits.hits);
      setTotalForum(res.data.joinedData.responses[0].hits.total.value + res.data.joinedData.responses[1].hits.total.value)
    });
  };


  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      handleSearch();
    }
  };
  console.log(serviceResult)
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
              placeholder="Search here.."
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
        {(forumResult.length > 0 || serviceResult.length > 0) && <>
          <TrendingSearchResult searchForumResult={forumResult} query={query} searchResultService={serviceResult} activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage}
          />
        </>
        }

      </MDBRow>
    </>
  );
};
export default Search;
