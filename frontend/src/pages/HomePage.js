import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const url = "http://localhost:3000/posts/";
      const response = await fetch(url);
      const responseData = await response.json();
      setPosts(responseData.data);
    }
    getPosts();
  }, []);

  const [value, setValue] = useState("all");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <section className="page">
      <label>
        Category:
        <select value={value} onChange={handleChange}>
          <option value="all">All</option>
          <option value="meals">Meals</option>
          <option value="bakery">Bakery</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat</option>
        </select>
      </label>

      <section className="grid-container">
        {posts.map((post) => {
          if (value != "all") {
            if (post.category === value) {
              return <PostCard post={post} key={post.id} />;
            }
          } else {
            return <PostCard post={post} key={post.id} />;
          }
        })}
      </section>
    </section>
  );
}
