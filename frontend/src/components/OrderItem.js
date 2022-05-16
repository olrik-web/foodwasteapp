import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeartBroken,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function OrderItem({ order }) {
  const navigate = useNavigate();
  // const image = require(`../assets/img/${post.image}`);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [post, setPosts] = useState([]);

  useEffect(() => {
    async function getPost() {
      const url = `http://localhost:3000/backend/posts?id=${order.postId}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setPosts(responseData.data[0]);
    }
    getPost();
  }, []);
  /**
   * handleClick is called when user clicks on the Article (PostCard)
   */
  function handleClick() {
    navigate(`../details/${post.id}`);
  }
  if (post.uid != null) {
    return (
      <article onClick={handleClick}>
        <div className="detailsContainer">
          <div>
            <UserAvatar uid={post.uid} />
            {/* <img src={image} alt={post.title} /> */}
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>{order.amount}</p>
            <p>{order.created_at}</p>
          </div>
        </div>
      </article>
    );
  } 
}