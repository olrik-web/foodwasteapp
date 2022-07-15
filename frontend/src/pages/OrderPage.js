import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderItem from "../components/OrderItem";

export default function MyPosts() {
  const [orders, setOrders] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("authUser")));
  const params = useParams();
  useEffect(() => {
    async function getOrders() {
      const url = `https://www.pardesyar.dk/greenEat/backend/orders?buyerId=${params.buyerId}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setOrders(responseData.data);
    }
    getOrders();
  }, []);

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
