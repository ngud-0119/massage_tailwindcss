import React, { useEffect, useState, useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Icon } from "@iconify/react";
import profileicon from "../../assets/icons/profile-white.svg";
import addmeause from "../../assets/icons/bx_add-to-queue.svg";
import plusicon from "../../assets/icons/plus-icon.svg";
import activeProfileIcon from "../../assets/icons/activeProfileIcon.svg";
import activeplusicon from "../../assets/icons/activeplusicon.svg";
import { Context } from "../../context/dataContext";
import "../css/main.css"
export default function Sidebar() {
  const [isActivate, setActivate] = useState("/profile");
  const [changeicon, setchangeicom] = useState("clarity:menu-line");
  const [toggeling, settoggel] = useState(false);
  const [addActiveClass, setAddActiveClass] = useState(1);
  const location = useLocation();

  const link = location?.state;
  const { setIsSearchPage } = useContext(Context);
  useEffect(() => {
    if (link?.linkId) {
      setAddActiveClass(link?.linkId);
    }
  }, [link?.linkId]);
  useEffect(() => {
    setIsSearchPage(false)
  }, []);

  const toggelClose = (e) => {
    settoggel(true);
    setchangeicom("clarity:close-line");
  };

  const MenuItems = [
    {
      id: 1,
      name: "Profile",
      to: "/account/profile",
      className: "sidebar-active sidebarItem",
      icon: profileicon,
      activeIcon: activeProfileIcon,
    },
    {
      id: 2,
      name: "Manage Massage Business Pages",
      to: "/account/spa",
      className: "sidebar-active sidebarItem",
      icon: addmeause,
      activeIcon: addmeause,
    },
    {
      id: 3,
      name: "Manage Masseuse Profile Page",
      to: "/account/masseuse",
      className: "sidebar-active sidebarItem",
      icon: plusicon,
      activeIcon: activeplusicon,
    },
  ];
  const handleClick = (id) => {
    // setState({ activeLink: id });
    setAddActiveClass(id);
    console.log(id);
  };
  return (
    <>
      <ProSidebar
        toggled={toggeling}
        onToggle={() => {
          settoggel(false);
          setchangeicom("clarity:menu-line");
        }}
        className="lg mobile-sidebar"
        style={{
          width: "16%",
          minWidth: "16%"
        }}
      >
        <Menu iconShape="square">
          {MenuItems.map((link) => {
            return (
              <MenuItem
                className={
                  link.id === addActiveClass ? link.className : "sidebarItem"
                }
              // style={{ marginLeft: "-9px" }}
              >
                {" "}
                <img
                  src={link.id == addActiveClass ? link.activeIcon : link.icon}
                  className="menu-icon"
                />{" "}
                <Link to={link.to} onClick={() => handleClick(link.id)} />
                {link.name}
              </MenuItem>
            );
          })}
        </Menu>
      </ProSidebar>

      <div className="sidebaricon">
        <Icon icon={changeicon} onClick={toggelClose}></Icon>
      </div>

      {/* <Nav className="col-md-12  d-md-block d-block  sidebar  "  

    
    onSelect={selectedKey => setActivate('/'+selectedKey)}  activeKey={isActivate}
    >
        <div className="sidebar-sticky"></div>
    <Nav.Item className='sidebar-item'>
        <NavLink to="/profile">
        <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1934 6.272C16.1934 9.62585 13.4745 12.3448 10.1206 12.3448C6.76679 12.3448 4.04785 9.62585 4.04785 6.272C4.04785 2.91788 6.76679 0.199219 10.1206 0.199219C13.4745 0.199219 16.1934 2.91788 16.1934 6.272Z" />
<path d="M10.1211 13.0732C4.53412 13.0732 0 17.5267 0 23.5996H20.2428C20.2426 17.5266 15.7083 13.0732 10.1211 13.0732Z" />
</svg>

  &nbsp;         <span className='sidebar-text-block'> Profile</span> </NavLink>
    </Nav.Item>
    <Nav.Item className='sidebar-item'>
        <NavLink to="/add-spa" eventKey='add-spa'>
            
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.600586" y="0.199219" width="23.4" height="23.4" rx="2.7" fill="white"/>
<path d="M20.1018 2.14746H8.40126C7.32579 2.14746 6.45117 3.02208 6.45117 4.09755V15.7981C6.45117 16.8736 7.32579 17.7482 8.40126 17.7482H20.1018C21.1773 17.7482 22.0519 16.8736 22.0519 15.7981V4.09755C22.0519 3.02208 21.1773 2.14746 20.1018 2.14746ZM8.40126 15.7981V4.09755H20.1018L20.1038 15.7981H8.40126Z" fill="#C8175D"/>
<path d="M4.50087 7.9999H2.55078V19.7004C2.55078 20.7759 3.4254 21.6505 4.50087 21.6505H16.2014V19.7004H4.50087V7.9999ZM15.2264 6.0498H13.2763V8.97494H10.3511V10.925H13.2763V13.8502H15.2264V10.925H18.1515V8.97494H15.2264V6.0498Z" fill="#C8175D"/>
</svg>

&nbsp;    <span className='sidebar-text-block'> Add/Register Spa</span></NavLink>
    </Nav.Item>
    <Nav.Item className='sidebar-item'>
        <NavLink to="/#">
            
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.08009 23.4986H19.1202C21.7008 23.4986 23.8002 21.3993 23.8002 18.8187L23.8004 4.77856C23.8004 2.19797 21.7011 0.0986328 19.1205 0.0986328H5.08032C2.49973 0.0986328 0.400391 2.19797 0.400391 4.77856V18.8187C0.400391 21.3995 2.49973 23.4989 5.08032 23.4989L5.08009 23.4986ZM7.14283 10.7956H11.0974V6.84113C11.0974 6.28732 11.5462 5.8382 12.1003 5.8382C12.6541 5.8382 13.1032 6.28707 13.1032 6.84113V10.7956H17.0577C17.6115 10.7956 18.0607 11.2445 18.0607 11.7986C18.0607 12.3524 17.6118 12.8015 17.0577 12.8015H13.1032V16.756C13.1032 17.3098 12.6543 17.759 12.1003 17.759C11.5465 17.759 11.0974 17.3101 11.0974 16.756V12.8015H7.14283C6.58903 12.8015 6.1399 12.3526 6.1399 11.7986C6.1399 11.2448 6.58877 10.7956 7.14283 10.7956Z" fill="white"/>
</svg>

&nbsp;       <span className='sidebar-text-block'> Add/Register Masseuse</span></NavLink>
    </Nav.Item>
  
    </Nav> */}
    </>
  );
}
