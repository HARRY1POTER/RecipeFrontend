import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from "../axiosConfig";
import toast, { Toaster } from "react-hot-toast";

import "./Full.css";

function SaveRecipe() {
  const [recipes2, setRecipes2] = useState({
    photo: "",
    recipeTitle: "",
    about: "",
    keywords: "",
    steps: [],
    ingredients: [],
  });

  useEffect(() => {
    const id = localStorage.getItem("_Id");
    console.log("Fetched ID from localStorage:", id); // Debugging log

    if (id) {
      getRecipes1(id);
    } else {
      console.error("No ID found in localStorage");
    }
  }, []);

  const getRecipes1 = async (id) => {
    try {
      const res = await axios.get(`/saved-recipes/${id}`);
      console.log(`Fetching recipe💕👌🤷‍♂️ with ID: ${id}`); // Debugging log
      console.log("Fetched recipe data:", res.data); // Debugging log

      const parsedData = {
        ...res.data,
        steps: JSON.parse(res.data.steps),
        ingredients: JSON.parse(res.data.ingredients),
      };
      setRecipes2(parsedData);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/saved-recipes/${id}`);
      window.location.href = "/Save";
      if (response.status === 200) {
        toast.success("Post Delete Successfully");
      } else {
        console.error("Error deleting recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="bo">
      <div className="con">
        <div className="image-container">
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/${recipes2.photo}`}
            alt="Recipe"
            className="image"
          />
        </div>
        <div className="details">
          <div className="detail">
            <h1 className="title">{recipes2.recipeTitle}</h1>
          </div>
          <div className="detail">
            <p className="o">About :</p>
            <p className="text">{recipes2.about}</p>
          </div>
          <div className="detail">
            <p className="o">Keywords :</p>
            <p className="text">{recipes2.keywords}</p>
          </div>
        </div>
      </div>
      <div className="steps">
        <p className="o">Steps :</p>
        <ul className="text">
          {recipes2.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      <div className="ingredients">
        <p className="o">Ingredients :</p>
        <ul className="text">
          {recipes2.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="gap">
        <button
          onClick={() => handleDelete(localStorage.getItem("_Id"))}
          className="btn"
        >
          Delete
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default SaveRecipe;
