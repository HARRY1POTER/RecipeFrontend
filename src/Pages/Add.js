import React, { useState } from "react";
// import axios from "axios";
import axios from "../axiosConfig";
import toast, { Toaster } from "react-hot-toast";

import "./Add.css";

function Add() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [error, setError] = useState(false);

  const onChangeImages = (e) => {
    setPhoto(e.target.files[0]);
  };

  const addRecipe = async () => {
    if (!name || !about || !keyword || !steps || !ingredients) {
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("recipeTitle", name);
    formData.append("about", about);
    formData.append("keywords", keyword);
    formData.append("steps", JSON.stringify(steps));
    formData.append("ingredients", JSON.stringify(ingredients));

    try {
      const response = await axios.post("/AddRecipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      toast.success("Recipe Added Successfully");
      setName("");
      setAbout("");
      setKeyword("");
      setSteps([""]);
      setIngredients([""]);
      setPhoto(null);
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error(
        "An error occurred while adding the recipe. Please try again later."
      );
    }
  };

  const handleAddField = (type) => {
    if (type === "steps") {
      setSteps([...steps, ""]);
    } else if (type === "ingredients") {
      setIngredients([...ingredients, ""]);
    }
  };

  const handleFieldChange = (index, value, type) => {
    if (type === "steps") {
      const updatedSteps = [...steps];
      updatedSteps[index] = value;
      setSteps(updatedSteps);
    } else if (type === "ingredients") {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index] = value;
      setIngredients(updatedIngredients);
    }
  };

  return (
    <div className="main4 k">
      <div className="container4">
        <div className="card4">
          <h1>Add Recipe</h1>
          <form>
            <div>
              <label>Photo: </label>
              <input
                type="file"
                name="photo"
                required
                onChange={onChangeImages}
              />
            </div>

            <div>
              <label>Recipe Title</label>
              <input
                className="z"
                type="text"
                name="Title"
                placeholder="Enter Recipe Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              {error && !name && (
                <span className="error-span">Enter valid name</span>
              )}
            </div>

            <div>
              <label>About</label>
              <textarea
                className="z"
                placeholder="Enter About Recipe"
                value={about}
                required
                name="about"
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
              {error && !about && (
                <span className="error-span">Enter valid about</span>
              )}
            </div>

            <div>
              <label>Keyword</label>
              <input
                className="z"
                type="text"
                placeholder="Enter Keywords"
                value={keyword}
                name="keyword"
                required
                onChange={(e) => setKeyword(e.target.value)}
              />
              {error && !keyword && (
                <span className="error-span">Enter valid keywords</span>
              )}
            </div>

            <div>
              <label>Steps</label>
              {steps.map((step, index) => (
                <input
                  className="z"
                  key={index}
                  name="steps"
                  type="text"
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  required
                  onChange={(e) =>
                    handleFieldChange(index, e.target.value, "steps")
                  }
                />
              ))}
              {error && !steps && (
                <span className="error-span">Enter valid steps</span>
              )}

              <button type="button" onClick={() => handleAddField("steps")}>
                Add Step
              </button>
            </div>

            <div>
              <label>Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <input
                  className="z"
                  key={index}
                  type="text"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  required
                  name="Ingredients"
                  onChange={(e) =>
                    handleFieldChange(index, e.target.value, "ingredients")
                  }
                />
              ))}

              {error && !ingredients && (
                <span className="error-span">Enter valid ingredients</span>
              )}
              <button
                type="button"
                onClick={() => handleAddField("ingredients")}
              >
                Add Ingredient
              </button>
            </div>

            <button type="button" onClick={addRecipe}>
              Add Recipe
            </button>
            <Toaster position="top-center" reverseOrder={false} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
