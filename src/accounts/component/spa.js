import { MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import SpaTable from "./index";
import { NavLink, useNavigate } from "react-router-dom";

export default function AccountSpa() {
  const navigate = useNavigate();
  const handlerRegister = () => {
    navigate("/account/spa/add");
  };
  return (
    <>
      <SpaTable />
      <div>
        <MDBBtn
          type="button"
          className="btn-regtr btn-bottom"
          block
          onClick={handlerRegister}
          style={{ marginTop: "8px" }}
        >
          + Add/Register Massage Business
        </MDBBtn>
      </div>
    </>
  );
}
