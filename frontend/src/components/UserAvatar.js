import React, { useState, useEffect } from "react";
import placeholder from "../assets/img/user-placeholder.jpg";

export default function UserAvatar({ uid }) {
  const [user, setUser] = useState({
    name: "User's Name",
    street: "User's Street",
  });
  const url = `https://greeneat.marcusolrik.dk/backend/users/?id=${uid}`;

  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const responseData = await response.json();
      setUser(responseData.data[0]);
    }
    getUser();
  }, [url]);

  if (user != null) {
    return (
      <div className="avatar">
        {user.image != null && (
          <img
            src={`/backend/images/${user.image}` || placeholder}
            alt={user.id}
          />
        )}

        <span>
          <h3>{user.name}</h3>
          <p>{user.street}</p>
          <p>
            {user.zipcode} {user.city}
          </p>
        </span>
      </div>
    );
  }
}
