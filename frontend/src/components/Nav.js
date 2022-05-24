import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faHeart,
  faHome,
  faList,
  faUser,
  faBasketShopping,
  faTimes,
  faBars
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/img/greenEat-logo.png";



export default function Nav() {
  const [user] = useState(JSON.parse(localStorage.getItem("authUser")));

  const [clicked,setClicked] = useState(false);

  function handleClick(){
    setClicked(!clicked);
  }
  
    return (
      <nav className="nav">

        <div className="logoSection">

          <img src={logo} alt="logo" style={{height:"70px" , width:"100px"}} className="logoImg"/>

        </div>

        <div className="burgerBar" onClick={handleClick}>
          {clicked ? (
            <FontAwesomeIcon icon={faTimes}/>
          ): (<FontAwesomeIcon icon={faBars}/>)}
        </div>

        <div className={clicked ? "nav-menu menuActive" : "nav-menu"}>

        <NavLink to="/">
          <FontAwesomeIcon icon={faHome} /> <p>Home</p>
        </NavLink>
        {user.admin === "1" && (
          <>
            <NavLink to="/create">
              <FontAwesomeIcon icon={faEdit} /> <p>Create</p>
            </NavLink>
            <NavLink to="/myPosts">
              <FontAwesomeIcon icon={faList} /> <p>My Posts</p>
            </NavLink>
          </>
        )}
        <NavLink to="/profile">
          <FontAwesomeIcon icon={faUser} /> <p>Profile</p>
        </NavLink>
        <NavLink to="/favorite">
          <FontAwesomeIcon icon={faHeart} /> <p>Favorites</p>
        </NavLink>
        <NavLink to={`/orders/${user.id}`}>
          <FontAwesomeIcon icon={faBasketShopping} /> <p>Orders</p>
        </NavLink>
        </div>
      </nav>
    );
  }

