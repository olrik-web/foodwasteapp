import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [user] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    async function getPosts() {
      const url = "http://localhost:3000/backend/posts/";
      const response = await fetch(url);
      const responseData = await response.json();
      setPosts(responseData.data);
    }
    getPosts();
  }, []);

  return (
    <section className="page">
      <h1 className="text-center">My Posts</h1>
      <section className="grid-container">
        {posts.map((post) => {
          if (post.uid === user.id) {
            return <PostCard post={post} key={post.id} />;
          }
        })}
      </section>
    </section>
  );
}
