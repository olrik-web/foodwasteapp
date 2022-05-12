import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeartBroken,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const image = require(`../assets/img/${post.image}`);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [favorites, setFavorites] = useState([]);

  const [isFavorite, setFavorite] = useState(false);

  /**
   * handleClick is called when user clicks on the Article (PostCard)
   */
  function handleClick() {
    navigate(`../posts/${post.id}`);
  }

  useEffect(() => {
    async function getFavorites() {
      const url = `http://localhost:3000/favorites?uid=${user.id}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setFavorites(responseData.data);
      const result = responseData.data.find((item) => item.postid === post.id);
      setFavorite(result ? true : false);
    }
    getFavorites();
  }, []);

  async function favoriteAdd(post) {
    const data = {
      postid: post.id,
      uid: user.id,
    };
    const url = "http://localhost:3000/favorites";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function favoriteDelete(post) {
    const url = `http://localhost:3000/favorites?postid=${post.id}`;
    await fetch(url, {
      method: "DELETE",
    });
  }

  useEffect(() => {
    // console.log(found);
  }, [isFavorite]);

  const buttonHandler = () => {
    if (isFavorite) {
      favoriteDelete(post);
    } else {
      favoriteAdd(post);
    }
    setFavorite((current) => !current);
  };

  return (
    <article onClick={handleClick}>
      <div className="detailsContainer">
        <div>
          <UserAvatar uid={post.uid} />
          <img src={image} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
        <div className="buttonsLeft">
          <button className="postButtons">Buy</button>
          <a
            onClick={(e) => {
              e.stopPropagation();
              buttonHandler(post);
            }}
            type="button"
            className="postFavorite"
          >
            {isFavorite ? (
              <FontAwesomeIcon icon={faHeartCircleCheck} />
            ) : (
              <FontAwesomeIcon icon={faHeart} />
            )}
          </a>
        </div>
        {/* <div className="buttonsRight"></div> */}
      </div>
    </article>
  );
}
