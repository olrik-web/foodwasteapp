import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";

export default function UpdatePage() {
  const [post, setPost] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

   const user = JSON.parse(localStorage.getItem("authUser"));

  const url = `http://localhost:3000/posts/?id=${params.postId}`;

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const responseData = await response.json();

      setPost(responseData.data[0]);
    }
    getPost();
  }, [url]);

  function handleClick() {
    navigate(`/update/${post.id}`);
  }

  let image = "";
  if (post.image != null) {
    image = require(`../assets/img/${post.image}`);
  }

  if (user.admin === "1" && user.id === post.uid) {
    return (
    <section className="page">
      <div className="detailsImg">
        <img className="detailsImage" src={image} alt={post.title} />
      </div>
      <div className="detailsPage">
        <div className="detailsUser">
          <UserAvatar uid={post.uid} />
        </div>
        <h1 className="text-center">{post.title}</h1>
        <p>{post.body}</p>
        <button onClick={handleClick}>Edit/delete post</button>
      </div>
    </section>
    );
  }

  if (!post.uid) {
    return null;
  }
  return (
    <section className="page">
      <div className="detailsImg">
        <img className="detailsImage" src={image} alt={post.title} />
      </div>
      <div className="detailsPage">
        <div className="detailsUser">
          <UserAvatar uid={post.uid} />
        </div>
        <h1 className="text-center">{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </section>
  );
}
