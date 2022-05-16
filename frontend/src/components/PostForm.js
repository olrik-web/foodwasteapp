import React, { useEffect, useState } from "react";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";

export default function PostForm({savePost, post }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pickup,setPickup] = useState("");
  const [quantity,setQuantity] = useState("");
   const [price,setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category,Setcategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (post) {
      // if post, set the states with values from the post object.
      // The post object is a prop, passed from UpdatePage
      setTitle(post.title);
      setBody(post.body);
      setPickup(post.pickup);
      setQuantity(post.quantity);
      setPrice(post.price);

      setImage(post.image);
      Setcategory(post.category);
    }
  }, [post]); // useEffect is called every time post changes.

  /**
   * handleImageChange is called every time the user chooses an image in the fire system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("The image file is too big!");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    //TODO: Tjek om body er mindre end 255 characters, som der må ligge på databasen
    const formData = {
      // create a new objebt to hold the value from states / input fields
      title: title,
      image: image,
      body: body,
      pickup:pickup,
      quantity:quantity,
      price:price,
      category:category
    };

    const validForm = formData.title && formData.body && formData.pickup && formData.quantity && formData.price && formData.image && formData.category; // will return false if one of the properties doesn't have a value
    if (validForm) {
      // if all fields/ properties are filled, then call savePost
      savePost(formData);
    } else {
      // if not, set errorMessage state.
      setErrorMessage("Please, fill in all fields.");
    }
  }

  const [value, setValue] = useState("meals");

  const handleChange = (event) => {
    Setcategory(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          value={title || ""}
          placeholder="Type a title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Body
        <input
          type="text"
          value={body || ""}
          placeholder="Type a body text"
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        Pickup at
        <input
          type="dateTime-local"
          value={pickup || ""}
          onChange={(e) => setPickup(e.target.value)}
        />
      </label>
      <label>
        Quantity
        <input
          type="number" min="1" max="100"
          value={quantity || ""}
           placeholder="Quantity (Max 100)"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <label>
        Price DKK
        <input
          type="number" min="1" max=""
          value={price || ""}
           placeholder="DKK 200"
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Category &nbsp; <br/>
        <select value={value} onChange={handleChange} className="selectPost">
          <option value="meals">Meals</option>
          <option value="bakery">Bakery</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat</option>
        </select>
      </label>
      <label>
        <br/> <br/>
        Image
        <input
          type="file"
          className="file-input"
          accept="image/*"
          onChange={handleImageChange}
        />
        <img
          className="image-preview"
          src={image || imgPlaceholder}
          alt="Choose"
          onError={(event) => (event.target.src = imgPlaceholder)}
        />
      </label>
      <p className="text-error">{errorMessage}</p>
      <button type="submit">Save</button>
    </form>
  );
}
