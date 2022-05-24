import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderItem from "../components/OrderItem";

export default function MyPosts() {
  const [orders, setOrders] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("authUser")));
  const params = useParams();

  const url = `https://greeneat.marcusolrik.dk/backend/orders/?buyerId=${params.buyerId}`;

  useEffect(() => {
    async function getOrders() {
      const response = await fetch(url);
      const responseData = await response.json();
      setOrders(responseData.data);
    }
    getOrders();
  }, [url]);

  return (
    <section className="page">
      <h1 className="text-center">Orders</h1>
      <section className="grid-container">
        {orders.map((order) => {
          if (order.buyerId === user.id) {
            return <OrderItem order={order} key={order.id} />;
          }
        })}
      </section>
    </section>
  );
}
