import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";

export default function UpdatePage() {
  const [post, setPost] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

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
  // if (user.admin === "1" && user.id === post.uid) {
  return (
    <section className="page">
      <div className="detailsImg">
        <img className="detailsImage" src={image} alt={post.title} />
      </div>

      
      <div className="detailsPage">
        <br/>
        <div className="detailsUser">
          <UserAvatar uid={post.uid} />
        </div>
        <h1 className="text-center">{post.title}</h1>
        <p className="detailPostBody">{post.body}</p>
        <div className="buySection">

          <div className="buyButtons">
          <button
            className="postButtons"
            onClick={() => {
              if (amount > 0) setAmount(amount - 1);
            }} style={{width:"90px"}}
          >
            -
          </button>
          &nbsp;
         
          <p className="postButtons" id="amountSection">{amount}</p>
          
          {/* TODO: if(amount < post.amount) setAmount+1 */}
          &nbsp;
          <button className="postButtons" onClick={() => setAmount(amount + 1)} style={{width:"90px"}}>
            +
          </button>
          
          {/* <button className="postButtons" onClick={createOrder}>Order</button> */}
        </div>
         <button className="orderButton" onClick={createOrder}>Order</button>
        </div>

        {user.admin === "1" && user.id === post.uid && (
          <button onClick={handleClick}>Edit/delete post</button>
        )}
        
      </div>
    </section>
  );
}
