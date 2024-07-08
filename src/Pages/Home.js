import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const userData = JSON.parse(auth);
      if (userData && userData.data && userData.data.name) {
        setUsername(userData.data.name);
      }
    }
  }, []);

  return (
    <div className="k">
      <div className="cover">
        <img
          src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg"
          alt="Hero Background"
          className="background-image"
        />
        <div className="hero-content">
          <div className="text-overlay">
            {username && <h1>Welcome {username}</h1>}
            <h1 className="t1">
              Healthy Cooking Recipes <br /> and the right Nutrition.
            </h1>
            <p className="subtitle">Browse Through Over 6500 Tasty Recipes</p>
          </div>
        </div>
      </div>
      <div className="container1">
        <div className="image-container">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/keyqnkmsp4cfr2d4qvtn.jpg"
            alt="Sample"
            className="image-1"
          />
        </div>
        <div className="content">
          <h1 className="h caveat-font">About</h1>
          <h2 className="a">THAT'S WHAT OUR SAY CLIENT</h2>
          <p className="w">
            This dish combines fresh, high-quality ingredients to create a
            wholesome and nutritious meal that your body will thank you for.
            With a unique twist and a burst of exciting flavors, it's the
            perfect choice for a healthy and satisfying dining experience. Get
            ready to impress your family and friends with this remarkable
            recipe.
          </p>
        </div>
      </div>
      <div className="container5">
        <div className="content-1 ">
          <h1 className="h1 caveat-font">About</h1>
          <h2 className="a1">HEALTHY AND QUALITY WITH A NEW FEEL</h2>
          <p className="w1">
            Indulge in a culinary adventure with our delightful recipe. Savor
            the perfect blend of flavors, textures, and aromas that make every
            bite an unforgettable experience. Whether you're a seasoned chef or
            a novice in the kitchen, this dish is easy to prepare and promises a
            delectable outcome.
          </p>
        </div>
        <div className="image-container">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yd6q7vj4fhvteleq0065.jpg"
            alt="Sample"
            className="imag image-1"
          />
        </div>
      </div>
      <div className="container2">
        <div className="card">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/okl0xaxft6552fjjtz2v.jpg"
            alt="Sample"
            style={{ borderRadius: " 6% 6% 0% 0%" }}
          />
          <p className="t">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi in aut
            illum, eligendi iste dignissimos dolores veniam reiciendis natus
            rem, iure harum deleniti! Sit possimus sint repellat iste dolores
            ab.
          </p>
        </div>

        <div className="card">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tont20fs91ztyywbv1w3.jpg"
            alt="Sample"
            style={{ borderRadius: " 6% 6% 0% 0%" }}
          />
          <p className="t">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi in aut
            illum, eligendi iste dignissimos dolores veniam reiciendis natus
            rem, iure harum deleniti! Sit possimus sint repellat iste dolores
            ab.
          </p>
        </div>

        <div className="card">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/58q9ssssox2malve6cey.jpg"
            alt="Sample"
            style={{ borderRadius: " 6% 6% 0% 0%" }}
          />
          <p className="t">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi in aut
            illum, eligendi iste dignissimos dolores veniam reiciendis natus
            rem, iure harum deleniti! Sit possimus sint repellat iste dolores
            ab.
          </p>
        </div>

        <div className="card">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jep6d8153aqns3lmxkzz.jpg"
            alt="Sample"
            style={{ borderRadius: " 6% 6% 0% 0%" }}
          />
          <p className="t">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi in aut
            illum, eligendi iste dignissimos dolores veniam reiciendis natus
            rem, iure harum deleniti! Sit possimus sint repellat iste dolores
            ab.
          </p>
        </div>
      </div>
      <div className="container1">
        <div className="image-container">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/keyqnkmsp4cfr2d4qvtn.jpg"
            alt="Sample"
            className="image-1"
          />
        </div>
        <div className="content">
          <h1 className="h caveat-font">About</h1>
          <h2 className="a">TASTE THE FUTURE OF GOOD FOOD</h2>
          <p className="w">
            Indulge in a culinary adventure with our delightful recipe. Savor
            the perfect blend of flavors, textures, and aromas that make every
            bite an unforgettable experience. Whether you're a seasoned chef or
            a novice in the kitchen, this dish is easy to prepare and promises a
            delectable outcome.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
