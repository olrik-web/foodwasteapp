import React, { useState } from "react";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ setAuth }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const navigate = useNavigate();
  let image;
  // User image varchar(255) + date("Ymd_His_") = 271
  if (user.image.length < 280) {
    image = require(`../assets/img/${user.image}`);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = `http://localhost:3000/users/?id=${user.id}`;
    const userToUpdate = {
      id: user.id,
      name: user.name,
      mail: user.mail,
      phone: user.phone,
      image: user.image,
      street: user.street,
      zipcode: user.zipcode,
      city: user.city,
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(userToUpdate),
    });

    const responseObject = await response.json();
    console.log(responseObject);

    if (responseObject.status === "success") {
      localStorage.setItem("authUser", JSON.stringify(responseObject.data[0]));
    }
  }

  function handleSignOut() {
    setAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("authUser");
    navigate("/sign-in");
  }

  /**
   * handleImageChange is called every time the user chooses an image in the fire system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];

    if (file.size < 500000) {
      // image file size must be below 0,5MB

      if (file.type === "image/png" || file.type === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUser((prevUser) => ({ ...prevUser, image: event.target.result }));
        };
        reader.readAsDataURL(file);
        setErrorMessage(""); // reset errorMessage state
      } else {
        setErrorMessage("The image file type is not supported!");
      }
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("The image file is too big!");
    }
  }

  return (
    <section className="page">
      <h1 className="text-center">Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={user.name}
            onChange={handleChange}
            name="name"
            placeholder="Type name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={user.mail}
            onChange={handleChange}
            name="email"
            placeholder="Type email"
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            value={user.phone || ""}
            onChange={handleChange}
            name="phone"
            placeholder="Type phone number"
          />
        </label>
        <label>
          Street
          <input
            type="text"
            value={user.street || ""}
            onChange={handleChange}
            name="street"
            placeholder="Type your street"
          />
        </label>
        <label>
          Zip code
          <input
            type="text"
            value={user.zipcode || ""}
            onChange={handleChange}
            name="zipcode"
            placeholder="Type your zip code"
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={user.city || ""}
            onChange={handleChange}
            name="city"
            placeholder="Type your city"
          />
        </label>
        <label>
          Image
          <input
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          <img
            className="image-preview"
            src={image || user.image || imgPlaceholder}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
        </label>
        <p className="text-error">{errorMessage}</p>
        <button>Save User</button>
      </form>
      <button className="btn-outline" onClick={handleSignOut}>
        Sign Out
      </button>
    </section>
  );
}
