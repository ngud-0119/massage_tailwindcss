import React, { useState } from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
const Pagination = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  setPostsPerPage,
}) => {
  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };
  const handleCurrentPageNext = (value) => {
    setCurrentPage((prevState) => prevState + value);
  };
  const handleCurrentPagePrev = (value) => {
    setCurrentPage((prevState) => prevState - value);
  };
  return (
    <nav aria-label="Page navigation example">
      <MDBPagination className="mb-3">
        <MDBPaginationItem>
          <MDBPaginationLink onClick={() => handleCurrentPagePrev(1)} href="#">
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink onClick={() => handleCurrentPage(1)} href="#">
            1
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink onClick={() => handleCurrentPage(2)} href="#">
            2
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink onClick={() => handleCurrentPage(3)} href="#">
            3
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink onClick={() => handleCurrentPageNext(1)} href="#">
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </nav>
  );
};

export default Pagination;
