import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import Modal from "../components/Modal";

export default function UpdatePage() {
  const [post, setPost] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const user = JSON.parse(localStorage.getItem("authUser"));

  const url = `http://localhost:3000/backend/posts/?id=${params.postId}`;

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
  async function createOrder() {
    if (post.quantity - amount < 0) {
      setModalTitle("Error");
      setModalBody("Cannot order more than " + post.quantity);
      setShow(true);
      return;
    }
    if (amount > 0) {
      const orderData = {
        buyerId: user.id,
        sellerId: post.uid,
        postid: post.id,
        amount: amount,
      };
      const url = "http://localhost:3000/backend/orders/";
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(orderData),
      });
      navigate(`/orders/${user.id}`);
    }
  }

  let image = "";
  if (post.image != null) {
    image = require(`../assets/img/${post.image}`);
  }

  if (!post.uid) {
    return null;
  }

  return (
    <section className="page">
      <Modal
        title={modalTitle}
        onClose={() => {
          setShow(false);
        }}
        show={show}
      >
        <p>{modalBody}</p>
      </Modal>
      <div className="detailsImg">
        <img className="detailsImage" src={image} alt={post.title} />
      </div>
      <div className="detailsPage">
        <br />
        <div className="detailsUser">
          <UserAvatar uid={post.uid} />
        </div>
        <h1 className="text-center">{post.title}</h1>
        <p className="detailPostBody">{post.body}</p>
        <div className="priceQty">
          {post.quantity > 4 ? (
            <p id="quantity"> quantity {post.quantity}</p>
          ) : post.quantity <= 4 && post.quantity > 0 ? (
            <p id="quantity" style={{ color: "red", border: "2px solid red" }}>
              {" "}
              Only {post.quantity} left{" "}
            </p>
          ) : (
            <p
              id="quantity"
              style={{
                color: "white",
                background: "#808080",
                border: "none",
              }}
            >
              {" "}
              Sold out
            </p>
          )}
          <p className="price">{post.price} DKK</p>
        </div>
        <div className="buySection">
          <div className="buyButtons">
            <button
              className="postButtons"
              onClick={() => {
                if (amount > 1) setAmount(amount - 1);
              }}
              style={{ width: "90px" }}
            >
              -
            </button>
            &nbsp;
            <p className="postButtons" id="amountSection">
              {amount}
            </p>
            &nbsp;
            <button
              className="postButtons"
              onClick={() => setAmount(amount + 1)}
              style={{ width: "90px" }}
            >
              +
            </button>
          </div>
          <button className="orderButton" onClick={createOrder}>
            Order
          </button>
        </div>

        {user.admin === "1" && user.id === post.uid && (
          <button onClick={handleClick}>Edit/delete post</button>
        )}
      </div>
    </section>
  );
}
