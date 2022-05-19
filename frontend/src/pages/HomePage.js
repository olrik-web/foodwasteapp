import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const url = "http://foodwasteapi.marcusolrik.dk/posts/";
      const response = await fetch(url);
      const responseData = await response.json();
      setPosts(responseData.data);
    }
    getPosts();
  }, []);

  const [value, setValue] = useState("All");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <section className="page">
      <label>
        Category: &nbsp;
        <select value={value} onChange={handleChange}  className="selectHome">
          <option value="All">All</option>
          <option value="Meals">Meals</option>
          <option value="Bakery">Bakery</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
        </select>
        <br/>
      </label>

        <br/>

      <section className="grid-container">
        {posts.map((post) => {
          if (value != "All") {
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
