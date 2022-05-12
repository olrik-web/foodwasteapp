import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import React, { useState } from "react";

export default function CreatePage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
    const navigate = useNavigate();

    async function createPost(newPost) {
        newPost.uid = user.id;
        const url = "http://localhost:3000/posts/";
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        navigate("/");
    }

    return (
      <section className="page">
        <h1 className="text-center">Create New Post</h1>
        <PostForm savePost={createPost} />
      </section>
    );
}
