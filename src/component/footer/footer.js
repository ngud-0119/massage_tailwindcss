import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

import "../../css/footer.css";
import flogo from "../../assets/logo.png";

export default function Footer() {
  return (
    <MDBFooter className="text-center footer" color="white">
      <MDBRow className="pb-2p">
        <MDBCol lg="3" md="6" className="mb-4 mb-md-0 solid-border">
          <img src={flogo} className="f-logo" />
        </MDBCol>

        <MDBCol
          lg="2"
          md="6"
          className="footer-menu-div"
          style={{ marginLeft: "75px" }}
        >
          {/* <h5 className="footer-headings">About us</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="/advertisers" className="text-light">
                Contact us
              </a>
            </li>

            <li>
              <a
                href="/termsAndConditions"
                className="text-light"
                target="_blank"
              >
                Terms and conditions
              </a>
            </li>
            <li>
              <a
                href="/termsAndConditions"
                className="text-light"
                target="_blank"
              >
                Privacy policy
              </a>
            </li>
          </ul> */}
        </MDBCol>

        <MDBCol lg="2" md="6" className="footer-menu-div">
          {/* <h5 className="footer-headings">Quick Links</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="/spa" className="text-light">
                Spa
              </a>
            </li>
            <li>
              <a href="/masseuse" className="text-light">
                Masseuse
              </a>
            </li>
            <li>
              <a href="/home" className="text-light">
                Forums
              </a>
            </li>
          </ul> */}
        </MDBCol>

        {/* <MDBCol lg="2" md="6" className="footer-menu-div">
          <h5 className="footer-headings">Tool & More</h5>

          <ul className="list-unstyled">
            <li>
              <a href="#!" className="text-light">
                Tools
              </a>
            </li>
            <li>
              <a href="#!" className="text-light">
                RSS feeds
              </a>
            </li>
            <li>
              <a href="#!" className="text-light">
                Newsletter
              </a>
            </li>
          </ul>
        </MDBCol> */}

        <MDBCol lg="2" md="6" className="footer-menu-div">
          {/* <h5 className="footer-headings">Advertisers</h5>

          <ul className="list-unstyled">
            <li>
              <a href="/advertisers" target="_blank" className="text-light">
                Advertise on bodyslides.ca
              </a>
            </li>
          </ul> */}
          {/* <h5 className="footer-headings">About us</h5> */}

          <ul className="list-unstyled mb-0">
            <li>
              <a href="/advertisers" className="text-light">
                {/* Contact us */}
              </a>
            </li>

            <li>
              <a
                href="/termsAndConditions"
                className="text-light"
                target="_blank"
              >
                Terms and Conditions
              </a>
            </li>
            <li>
              <a
                href="/privcyAndPolicy"

                className="text-light"
                target="_blank"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </MDBCol>
      </MDBRow>

      {/* <div className="bottom-footer">
        <p className="m-0">
          Powered by Codistan ® Bodyslides | Copyright © 2000 – 2022
          bodyslides.ca | All rights reserved.
        </p>
      </div> */}
    </MDBFooter>
  );
}
