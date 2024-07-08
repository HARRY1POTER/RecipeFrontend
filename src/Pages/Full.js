import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from "../axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Full.css";

function Full() {
  const [recipes, setRecipes] = useState({
    photo: "",
    recipeTitle: "",
    about: "",
    keywords: "",
    steps: [],
    ingredients: [],
  });

  useEffect(() => {
    const id = localStorage.getItem("_Id");
    if (id) {
      getRecipes(id);
    }
  }, []);

  const getRecipes = async (id) => {
    try {
      const res = await axios.get(`/Recipe/${id}`);
      console.log(res);

      const parsedData = {
        ...res.data,
        steps: JSON.parse(res.data.steps),
        ingredients: JSON.parse(res.data.ingredients),
      };
      setRecipes(parsedData);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  const saver = async () => {
    try {
      const res = await axios.post(`/save`, {
        photo: recipes.photo,
        recipeTitle: recipes.recipeTitle,
        about: recipes.about,
        keywords: recipes.keywords,
        steps: JSON.stringify(recipes.steps),
        ingredients: JSON.stringify(recipes.ingredients),
      });
      toast.success("Save Successfully");

      console.log("Recipe saved in 'save' database:", res.data);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/recipes/${id}`);

      window.location.href = "/Explore";
      if (response.status === 200) {
      } else {
        console.error("Error deleting recipe:", response.statusText);
      }
      toast.success("Post Delete Successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="bo">
      <div className="con">
        <div className="image-container">
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/${recipes.photo}`}
            alt="Recipe"
            className="image"
          />
        </div>
        <div className="details">
          <div className="detail">
            <h1 className="title">{recipes.recipeTitle}</h1>
          </div>
          <div className="detail">
            <p className="o">About :</p>
            <p className="text">{recipes.about}</p>
          </div>
          <div className="detail">
            <p className="o">Keywords :</p>
            <p className="text">{recipes.keywords}</p>
          </div>
        </div>
      </div>
      <div className="steps">
        <p className="o">Steps :</p>
        <ul className="text">
          {recipes.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      <div className="ingredients">
        <p className="o">Ingredients :</p>
        <ul className="text">
          {recipes.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="gap">
        <button className="btn" onClick={saver}>
          Save
        </button>
        <button
          onClick={() => handleDelete(localStorage.getItem("_Id"))}
          className="btn"
        >
          Delete
        </button>
        {/*   <button className="btn" onClick={handleEdit}>
          Edit
        </button> */}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Full;
