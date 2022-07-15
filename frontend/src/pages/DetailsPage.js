import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import background from "../assets/img/foodwasteapppic.jpg";


export default function UpdatePage() {
  const [post, setPost] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [seller,setSeller] = useState([]);

  const user = JSON.parse(localStorage.getItem("authUser"));

  const url = `https://www.pardesyar.dk/greenEat/backend/posts/?id=${params.postId}`;

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const responseData = await response.json();

      console.log(responseData);

      setPost(responseData.data[0]);  
      
      const userId = responseData.data[0].uid;
      const res = await fetch(`https://www.pardesyar.dk/greenEat/backend/users/?id=${userId}`);
      const dataResponse = await res.json();


      setSeller(dataResponse.data[0]);
      
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
      const url = "https://www.pardesyar.dk/greenEat/backend/orders/";
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
        {/* <h1 className="text-center">{post.title}</h1>
        <p className="detailPostBody">{post.body}</p>
        <div className="infoBox" style={{
        border:"solid 1px black", 
        width:"300px" , 
        height:"300px",
        textAlign:"center",
        }}>

          <p> Pickup at: {post.pickup_at}   </p>

        </div>  */}


        <div className="detailsContent">
          <div className="leftContent">

            <h1>Informations</h1>

            <div className="infoListItems">
              <p><strong>Price:</strong> {post.price}</p>
               {/* <strong id="itemOne">Price:</strong>
              <p id="itemTwo">{post.price}</p> */}
            {post.quantity > 4 ? (
            <p> <strong>Quantity:</strong> {post.quantity}</p>
          ) : post.quantity <= 4 && post.quantity > 0 ? (
            <p>
              {" "}
              <strong>Quantity:</strong> Only {post.quantity} left{" "}
            </p>
          ) : (
            <p
            >
              {" "}
              Sold out
            </p>
          )}

          <p><strong>Pickup at:</strong> {post.pickup_at}</p>
          <p><strong>Adress:</strong> {seller.street} {seller.zipcode} {seller.city}</p>
            </div>

          </div>
          <div className="rightContent" style={{backgroundImage:`url(${background})` }} >
            <h1 className="text-center">{post.title}</h1>
        <p className="detailPostBody">{post.body}</p>
          </div>
        </div>
      
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
              style={{ width: "90px" , marginLeft:"120px"}}
            >
              <FontAwesomeIcon icon={faSquareMinus} style={{fontSize:"15px"}}/>
            </button>
            &nbsp;
            <p className="postButtons" id="amountSection">
              {amount}
            </p>
            &nbsp;
            <button
              className="postButtons"
              onClick={() => setAmount(amount + 1)}
              style={{ width: "90px" , fontWeight:"900"}}
            >
              <FontAwesomeIcon icon={faSquarePlus} style={{fontSize:"15px"}}/>
            </button>
          </div>
          <button className="orderButton" onClick={createOrder}>
            Order
          </button>
        </div>

        {user.admin === "1" && user.id === post.uid && (
          <button onClick={handleClick} style={{width:"216px"}}>Edit/delete post</button>
        )}
      </div>
    </section>
  );
}
