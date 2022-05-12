import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHeart, faHome, faList, faPager, faUser} from "@fortawesome/free-solid-svg-icons"

export default function Nav() {
  const [user] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  if (user.admin === "1") {
    return (
      <nav className="nav">
        <NavLink to="/"><FontAwesomeIcon icon={faHome} /> <p>Home</p></NavLink>
        <NavLink to="/create"><FontAwesomeIcon icon={faEdit} /> <p>Create</p></NavLink>
        <NavLink to="/profile"><FontAwesomeIcon icon={faUser} /> <p>Profile</p></NavLink>
        <NavLink to="/favorite"><FontAwesomeIcon icon={faHeart} /> <p>Favorites</p></NavLink>
        <NavLink to="/myPosts"><FontAwesomeIcon icon={faList} /> <p>My Posts</p></NavLink>
      </nav>
    );
  }
  return (
    <nav>
      {/* <NavLink to="/create">Create</NavLink> */}
      <NavLink to="/"><FontAwesomeIcon icon={faHome} /> <p>Home</p></NavLink>
        <NavLink to="/profile"><FontAwesomeIcon icon={faUser} /> <p>Profile</p></NavLink>
        <NavLink to="/favorite"><FontAwesomeIcon icon={faHeart} /> <p>Favorites</p></NavLink>
      
    </nav>
  );
}
