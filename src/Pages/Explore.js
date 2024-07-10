import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import imag from "./image.png";
import toast, { Toaster } from "react-hot-toast";

import "./Explore.css";

import { useMyContext } from "../context/context";
// import axios from "axios";
import axios from "../axiosConfig";

function Explore() {
  const { getRecipes, recipes, searchHandle, loading } = useMyContext();

  const handleBlogClick = (id) => {
    localStorage.setItem("_Id", id);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/recipes/${id}`);
      if (response.status === 200) {
      } else {
        console.error("Error deleting recipe:", response.statusText);
      }
      getRecipes();
      toast.success("Post Delete Successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="k">
      <div className="ima ">
        <img src={imag} alt="imagee" />
        <div className="overlay">
          <h2>Find the best recipes in a few step!</h2>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" onChange={searchHandle} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="Econtainer px-3">
          <h1>Explore hundreds of recipes</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {recipes.length > 0 ? (
              recipes.map((item, index) => (
                <div className="col" key={index}>
                  <div className="Ecard h-100">
                    <img
                       src={`https://recipe-backend-eight.vercel.app/${item.photo}`}
                      className="card-img-top"
                      alt="Recipe"
                    />

                    <div className="card-body">
                      <h5 className="card-title">{item.recipeTitle}</h5>
                      <p className="card-text">{item.about}</p>
                      <div className="gap">
                        <Link to={`/Full/${item.recipeTitle}`}>
                          <button
                            onClick={() => handleBlogClick(item._id)}
                            className=" btn"
                          >
                            Full recipe
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className=" btn"
                        >
                          DELETE
                        </button>
                        <Toaster position="top-center" reverseOrder={false} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>No recipe</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
