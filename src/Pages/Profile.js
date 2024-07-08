import React, { useEffect, useState } from "react";
import "./Profile.css";
import CountUp from "react-countup";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useMyContext } from "../context/context";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");

  const { reci, recipes } = useMyContext();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const userData = JSON.parse(auth);
      if (
        userData &&
        userData.data &&
        userData.data.name &&
        userData.data.email
      ) {
        setUsername(userData.data.name);
        setUsermail(userData.data.email);
      }
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <img
            src="https://img.icons8.com/bubbles/100/000000/user.png"
            className="profile-image"
            alt="User-Profile-Image"
          />
          <div className="profile-info">
            <h4 className="profile-name">Name: {username}</h4>
            <p className="profile-email">Email: {usermail}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <p className="profile-label">Saved:</p>
            <CountUp end={reci?.length || 0} />
          </div>
          <div className="profile-stat">
            <p className="profile-label">Posts:</p>
            <CountUp end={recipes?.length || 0} />
          </div>
        </div>
      </div>
      <div className="profile-icons">
        <FaFacebook className="profile-icon" />
        <FaInstagram className="profile-icon" />
        <FaTwitter className="profile-icon" />
      </div>
    </div>
  );
};

export default Profile;
