import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    async function getFavorites() {
      const url = `https://greeneat.marcusolrik.dk/backend/favorites?uid=${user.id}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setFavorites(responseData.data);
    }
    getFavorites();
  }, [favorites]);

  useEffect(() => {
    async function getPosts() {
      const url = "https://greeneat.marcusolrik.dk/backend/posts/";
      const response = await fetch(url);
      const responseData = await response.json();
      setPosts(responseData.data);
    }
    getPosts();
  }, []);

  return (
    <section className="page">
      <h1 className="text-center">Favorites</h1>
      <section className="grid-container">
        {favorites.map((favorite) => {
          return posts.map((post) => {
            if (post.id === favorite.postid) {
              return <PostCard post={post} key={post.id} />;
            }
          });
        })}
      </section>
    </section>
  );
}
