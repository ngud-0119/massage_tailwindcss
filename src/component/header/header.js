import React, { Component, useState, useContext } from "react";
import logo from "../../assets/header-logo.png";
import "../../css/header.css";
import userImg from "../../assets/userImg.png";
import dashicon from "../../assets/dashboardIcon.svg";
import activeplusicon from "../../assets/icons/activeplusicon.svg";
import logoutIcon from "../../assets/logouticon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../src/accounts/css/edit-spa.module.css";
import { Navbar, Nav, Dropdown, Container, NavDropdown } from "react-bootstrap";
import { isLogin, isLogout } from "../../utils/isLogins";
import { Context } from "../../context/dataContext";
import SearchIcon from '@mui/icons-material/Search';
const Header = () => {
  const navi = useNavigate();
  const [errors, setErrors] = useState({});
  const { handleChangeQuery, query, isSearchPage } = useContext(Context);
  const submitHandler = () => {
    let errors = {};
    if (!query) {
      errors["query"] = "Search is required";
    }
    if (Object.keys(errors).length <= 0) {
      navi("/search", { state: { userType: "" } });

    } else {
      setErrors(errors);
    }
  };

  const handleLogout = () => {
    isLogout();
    // window.location.reload(true);
    // navi('/')
  };

  const handleClick = () => {
    navi("/login");
  };
  const handleSignUp = () => {
    navi("/signup");
  };

  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      submitHandler();
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        className="navbar-setting"
        style={{ background: "#fff" }}
      >
        <Navbar.Brand href="/" style={{ margin: 0 }}>
          <img src={logo} className="h-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav " className="" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto h-link m-auto ">
            <NavLink to="/" eventKey="1">
              Forums
            </NavLink>
            <NavLink to="/spa">Find Massage</NavLink>
            <NavLink to="/masseuse">Masseuse</NavLink>
            <NavLink to="/for-business">Manage Businesses</NavLink>
            <NavLink to="/advertisers">Advertise</NavLink>
            <NavLink to="/search">Search</NavLink>
            {isSearchPage ? "" : <>
              <div class="input-group header-search-bar" style={{
                display: "flex",
                alignItems: "center",
                // display: "none"
              }}>
                <input
                  value={query}
                  type="search"
                  onChange={handleChangeQuery}
                  name="query"
                  onKeyPress={handleKeypress}
                  required
                  class="form-control "
                  placeholder="Search here..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <SearchIcon style={{
                  color: "#c01c5b",
                  marginleft: "5px",
                  fontSize: "32px",
                  cursor: "pointer"
                }} onClick={submitHandler} />

              </div>
            </>}


          </Nav>
          <Nav>
            <Dropdown className="h-inline mx-2 popup-main-account" style={{ textAlign: "center" }}>
              {isLogin() ? (
                <>
                  <Dropdown.Toggle
                    id="dropdown-autoclose-true"
                    className="popup-account"
                  >
                    {/* <div style={{ display: "flex" }}> */}
                    {/* <button
                        style={{
                          marginRight: "49px",
                          backgroundColor: "#c01c5b",
                          padding: "0px 12px",
                          borderRadius: "6px",
                          border: "1px solid #c01c5b",
                          color: "white",
                          height: "41px",
                          fontWeight: 600,
                          marginTop: "6px",
                        }}
                        type="button"
                        // onClick={() => navigate("/account/spa/add")}
                      >
                        Add/Register Business
                      </button> */}

                    <div className="h-userImg">
                      {Array?.from(localStorage?.getItem("userName"))[0]}
                    </div>
                    {/* </div> */}
                  </Dropdown.Toggle>
                </>
              ) : (
                <>
                  <button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#c01c5b",
                      padding: "6px 20px",
                      borderRadius: "6px",
                      border: "1px solid #c01c5b",
                      color: "white",
                    }}
                    type="button"
                    onClick={handleClick}
                    className="btn-small"
                  >
                    Log In
                  </button>
                  <button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#c01c5b",
                      padding: "6px 20px",
                      borderRadius: "6px",
                      border: "1px solid #c01c5b",
                      color: "white",
                    }}
                    type="button"
                    onClick={handleSignUp}
                    className="btn-small"
                  >
                    Sign Up
                  </button>
                </>
              )}

              <Dropdown.Menu className="topRight">
                <div className="center" >
                  <span className="user-name">
                    {localStorage.getItem("userName")}
                  </span>
                </div>
                <Dropdown.Item
                  style={{ marginRight: "20px" }}
                  onClick={() => navi("/account/spa", { state: { linkId: 2 } })}
                >
                  {/* <NavLink
                    to="/account/spa"
                    state={{ linkId: 2 }}
                    style={{ paddingTop: "15px" }}
                  > */}
                  <img src={activeplusicon} />{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {" "}
                    Manage Massage Business Pages{" "}
                  </span>
                  {/* </NavLink> */}
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ marginRight: "20px" }}
                  onClick={() =>
                    navi("/account/masseuse", { state: { linkId: 3 } })
                  }
                >
                  {/* <NavLink
                    to="/account/masseuse"
                    state={{ linkId: 3 }}
                    style={{ paddingTop: "15px" }}
                  > */}
                  <img src={activeplusicon} />{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {" "}
                    Manage Masseuse Profile Page{" "}
                  </span>
                  {/* </NavLink> */}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    navi("/account/profile", { state: { linkId: 1 } })
                  }
                >
                  {/* <NavLink to="/account/profile" style={{ paddingTop: "15px" }}> */}
                  <img src={dashicon} />{" "}
                  <span style={{ marginLeft: "10px" }}> Account Settings </span>
                  {/* </NavLink> */}
                </Dropdown.Item>

                <Dropdown.Item onClick={() => handleLogout()}>
                  <img src={logoutIcon} />{" "}
                  <span style={{ marginLeft: "10px" }}>Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
