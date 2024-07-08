import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from "../axiosConfig";
import toast, { Toaster } from "react-hot-toast";

// import "./EditRecipe.css";

function EditRecipe({ recipeId }) {
  const [recipe, setRecipe] = useState({
    photo: "",
    recipeTitle: "",
    about: "",
    keywords: "",
    steps: [],
    ingredients: [],
  });

  useEffect(() => {
    getRecipe(recipeId);
  }, [recipeId]);

  const getRecipe = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/Recipe/${id}`);
      const parsedData = {
        ...res.data,
        steps: JSON.parse(res.data.steps),
        ingredients: JSON.parse(res.data.ingredients),
      };
      setRecipe(parsedData);
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }
  };

  const handleFieldChange = (index, value, type) => {
    const updatedRecipe = { ...recipe };
    if (type === "steps") {
      updatedRecipe.steps[index] = value;
    } else if (type === "ingredients") {
      updatedRecipe.ingredients[index] = value;
    }
    setRecipe(updatedRecipe);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/recipes/${recipeId}`, recipe);
      toast.success("Recipe updated successfully");
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe. Please try again later.");
    }
  };

  return (
    <div className="edit-container">
      <h1>Edit Recipe</h1>
      <div>
        <label>Recipe Title</label>
        <input
          type="text"
          value={recipe.recipeTitle}
          onChange={(e) =>
            setRecipe({ ...recipe, recipeTitle: e.target.value })
          }
        />
      </div>
      <div>
        <label>About</label>
        <textarea
          value={recipe.about}
          onChange={(e) => setRecipe({ ...recipe, about: e.target.value })}
        />
      </div>
      <div>
        <label>Keywords</label>
        <input
          type="text"
          value={recipe.keywords}
          onChange={(e) => setRecipe({ ...recipe, keywords: e.target.value })}
        />
      </div>
      <div>
        <label>Steps</label>
        {recipe.steps.map((step, index) => (
          <input
            key={index}
            type="text"
            value={step}
            onChange={(e) => handleFieldChange(index, e.target.value, "steps")}
          />
        ))}
      </div>
      <div>
        <label>Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) =>
              handleFieldChange(index, e.target.value, "ingredients")
            }
          />
        ))}
      </div>
      <button onClick={handleSave}>Save</button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default EditRecipe;
