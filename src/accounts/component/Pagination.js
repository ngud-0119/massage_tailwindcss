import React from 'react'
import "../css/main.css"
import {

    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,

} from "mdb-react-ui-kit";
const Pagination = ({ totalForum, setCurrentPage, forumtPerPage, currentPage, activeNumber, setActiveNumber }) => {

    console.log("Active number", activeNumber)
    console.log("Current page", currentPage)

    const pages = Math.ceil(totalForum / forumtPerPage)

    const handlePaginationNumber = (clickedValue) => {
        if (clickedValue <= pages) {
            setCurrentPage(clickedValue)
            setActiveNumber(clickedValue)
        }
    }
    const handleNext = () => {
        if (currentPage <= pages) {
            setCurrentPage(currentPage + 1)
            setActiveNumber("next")
        }
    }
    const handlePreviouse = () => {
        if (currentPage >= 2) {
            setCurrentPage(currentPage - 1)
            setActiveNumber("previouse")
        }
    }


    return (
        <nav
            aria-label="Page navigation pagenation-dis"
            id="mostRecentSpaDiscussions"
        >
            <MDBPagination className="mb-3">
                <MDBPaginationItem>
                    <MDBPaginationLink className={currentPage < 2 ? "disabled" : "" || activeNumber === "previouse" ? "active" : ""} style={{ cursor: "pointer" }} onClick={handlePreviouse}>Previous</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink className={activeNumber === 1 ? "active" : ""} style={{ cursor: "pointer" }} onClick={() => handlePaginationNumber(1)}>1</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink className={(pages < 2 ? "disabled" : "") || (activeNumber === 2 ? "active" : "")} style={{ cursor: "pointer" }} onClick={() => handlePaginationNumber(2)}>2</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink className={pages < 3 ? "disabled" : "" || activeNumber === 3 ? "active" : ""} style={{ cursor: "pointer" }} onClick={() => handlePaginationNumber(3)}>3</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink className={currentPage >= pages ? "disabled" : "" || pages <= 3 ? "disabled" : "" || activeNumber === "next" ? "active" : ""} style={{ cursor: "pointer" }} onClick={handleNext} >Next</MDBPaginationLink>
                </MDBPaginationItem>
            </MDBPagination>
        </nav>
    )
}

export default Pagination