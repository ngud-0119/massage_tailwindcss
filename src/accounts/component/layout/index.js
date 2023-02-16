import React from "react";
import Header from "../../../component/header/header";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import Sidebar from "../sidebar";
import "../../css/main.css";

export default function AccountLayout(props) {
  const { childCom } = props;

  return (
    <>
      <Header />

      <MDBRow className="">
        <MDBCol className=" bg-sidebar-" lg={2}>
          <Sidebar />
        </MDBCol>

        <MDBCol className="cantainer-main overflowHidden" lg={10}  >
          {childCom}
        </MDBCol>
      </MDBRow>
    </>
  );
}
