import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faHeartCircleCheck,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [favorites, setFavorites] = useState([]);

  const [isFavorite, setFavorite] = useState(false);

  /**
   * handleClick is called when user clicks on the Article (PostCard)
   */
  function handleClick() {
    navigate(`../details/${post.id}`);
  }

  useEffect(() => {
    async function getFavorites() {
      const url = `http://foodwasteapi.marcusolrik.dk/favorites?uid=${user.id}`;
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
    const url = "http://foodwasteapi.marcusolrik.dk/favorites";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function favoriteDelete(post) {
    const url = `http://foodwasteapi.marcusolrik.dk/favorites?postid=${post.id}`;
    await fetch(url, {
      method: "DELETE",
    });
  }

  useEffect(() => {}, [isFavorite]);

  const buttonHandler = () => {
    if (isFavorite) {
      favoriteDelete(post);
    } else {
      favoriteAdd(post);
    }
    setFavorite((current) => !current);
  };
  const value = process.env.PUBLIC_URL;
  const value2 = process.env["PUBLIC_URL"];
  // console.log(value);
  // console.log(value2);

  return (
    <article onClick={handleClick}>
      <div className="detailsContainer">
        <div>
          <UserAvatar uid={post.uid} />
          <img src={require(`../assets/img/${post.image}`)} alt={post.title} />
          <div className="priceQty">
            {post.quantity > 4 ? (
              <p id="quantity"> Quantity: {post.quantity}</p>
            ) : post.quantity <= 4 && post.quantity > 0 ? (
              <p
                id="quantity"
                style={{ color: "red", border: "2px solid red" }}
              >
                {" "}
                Only {post.quantity} left{" "}
              </p>
            ) : (
              <p
                id="quantity"
                style={{
                  color: "white",
                  background: "#808080",
                  border: "2px solid #808080",
                }}
              >
                {" "}
                Sold out
              </p>
            )}
            <p className="price">{post.price} DKK</p>
          </div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
        <div className="buttonsLeft">
          <button className="postButtons">Order now</button>
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
        <div>
          <p className="postDetailsLeft">
            <FontAwesomeIcon icon={faTag} style={{ color: "#f5a33e" }} />{" "}
            {post.category}
          </p>
          <p className="postDetailsRight">
            <FontAwesomeIcon
              icon={faBagShopping}
              style={{ color: "#f5a33e" }}
            />{" "}
            {post.pickup_at}
          </p>
        </div>
      </div>
    </article>
  );
}
