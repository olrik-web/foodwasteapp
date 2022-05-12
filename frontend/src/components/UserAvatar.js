import React, { useState, useEffect } from "react";
import placeholder from "../assets/img/user-placeholder.jpg";

export default function UserAvatar({ uid }) {
  const [user, setUser] = useState({
    name: "User's Name",
    street: "User's Street",
  });
  const url = `http://localhost:3000/users/?id=${uid}`;

  let image = "";
  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const responseData = await response.json();
      setUser(responseData.data[0]);
    }
    getUser();
  }, [url]);

  if (user.image != null) {
    image = require(`../assets/img/${user.image}`);
  }
  return (
    <div className="avatar">
      <img src={image || placeholder} alt={user.id} />
      <span>
        <h3>{user.name}</h3>
        <p>{user.street}</p>
      </span>
    </div>
  );
}
