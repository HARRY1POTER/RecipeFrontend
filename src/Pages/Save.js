import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import axios from "../axiosConfig";
import "./Explore.css";
import imagePlaceholder from "./image.png";
import { useMyContext } from "../context/context";
import toast, { Toaster } from "react-hot-toast";

function Explore() {
  const { saver, reci, setReci } = useMyContext();

  useEffect(() => {
    saver();
  }, []);

  const deletes = async (id) => {
    try {
      await axios.delete(`/saved-recipes/${id}`);
      setReci(reci.filter((recipe) => recipe.id !== id));
      toast.success("Recipe deleted successfully");
    } catch (err) {
      console.error("Error deleting recipe", err);
    }
  };

  const handleBlogClick = (id) => {
    localStorage.setItem("_Id", id);
    console.log(`Stored ID: ${id}`);
  };

  return (
    <div className="k">
      <div className="Econtainer px-3">
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
          {reci.length > 0 ? (
            reci.map((d, index) => (
              <div className="col" key={index}>
                <div className="Ecard h-100">
                  <img
                    src={
                      d.photo
                        ? `${process.env.REACT_APP_API_BASE_URL}/${d.photo}`
                        : imagePlaceholder
                    }
                    className="card-img-top"
                    alt="Recipe"
                  />
                  <div className="card-body">
                    <p className="card-title">{d.id}</p>
                    <h5 className="card-title">{d.recipeTitle}</h5>
                    <p className="card-text">{d.about}</p>

                    <Link to={`/Save-Recipe/${d.recipeTitle}`}>
                      <button
                        className="btn"
                        onClick={() => handleBlogClick(d.id)}
                      >
                        Full recipe
                      </button>
                    </Link>
                    <button className="btn ml-3" onClick={() => deletes(d.id)}>
                      Delete
                    </button>
                    <Toaster position="top-center" reverseOrder={false} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No recipe</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;
