import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
import axios from "../axiosConfig";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [recipes1, setRecipes1] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reci, setReci] = useState([]);

  const getRecipes = async () => {
    try {
      const result = await axios.get("/Recipe");
      setRecipes(result.data);
      console.log("Recipes ------->", result?.data);
      // getRecipes();
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  const searchHandle = async (event) => {
    console.warn(event.target.value);
    let key = event.target.value;
    console.log("🚀 ~ searchHandle ~ key:", key);
    if (key) {
      try {
        setLoading(true);
        let result = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/search/${key}`
        );
        result = await result.json();
        console.log("🚀 ~ searchHandle ~ result:", result);
        if (result) {
          setRecipes(result);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    } else {
      getRecipes();
    }
  };

  const saver = async () => {
    try {
      const res = await axios.get("/saved-recipes");

      const formattedData = res.data.map((recipe) => ({
        id: recipe._id,
        photo: recipe.photo,
        recipeTitle: recipe.recipeTitle,
        about: recipe.about,
        keywords: recipe.keywords,
        steps: recipe.steps,
        ingredients: recipe.ingredients,
      }));
      setReci(formattedData);
      // saver();
    } catch (err) {
      console.error("Error fetching saved recipes:", err);
    }
  };

  useEffect(() => {
    getRecipes();
    saver();
  }, []);

  return (
    <MyContext.Provider
      value={{
        recipes,
        setRecipes,
        reci,
        setReci,
        loading,
        setLoading,
        recipes1,
        saver,
        setRecipes1,
        searchHandle,
        getRecipes,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
