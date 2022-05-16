import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import React, { useState } from "react";
import Modal from "../components/Modal";

export default function CreatePage() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  async function createPost(newPost) {
    newPost.uid = user.id;
    const url = "http://localhost:3000/backend/posts/";
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost),
    });
    if(response.ok) {
      setModalTitle("Success");
      setModalBody("Post has been created successfully.");
      setShow(true);
      return;
    } else {
      setModalTitle("Error");
      setModalBody("Something went wrong... Please try again.");
      setShow(true);
      return;
    }
  }

  return (
    <section className="page">
      <Modal
        title={modalTitle}
        onClose={() => {
          setShow(false);
          navigate("/");
        }}
        show={show}
      >
        <p>{modalBody}</p>
      </Modal>
      <h1 className="text-center">Create New Post</h1>
      <PostForm savePost={createPost} />
    </section>
  );
}
