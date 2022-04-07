import react from "react";
import homepage from "../homepage.css";
import video from "./Images/BackgroundVideo.mp4";
import classroom from "./Images/Classroom.jpg";
import Portfolio from "./Images/Portfolio.jpg";
import Tracker from "./Images/Tracker.jpg";

const HomePage = () => {
    return (
    <div><video loop autoPlay>
        <source
          src={video}
          type="video/mp4"
        />
      </video>
    <div className = "top">
        <h1 className = "header">Welcome</h1>
        </div>
    <div className = "bottom">
    <div className="card">
    <img src={classroom} alt="Avatar"/>
  <div className="container">
    <button className = "cardButton">Join Classroom</button>
  </div>
</div>
    <div className="card">
    <img src={Tracker} alt="Avatar"/>
  <div className="container">
    <button className = "cardButton">View Tracker</button>
  </div>
</div>
    <div className="card">
    <img src={Portfolio} alt="Avatar"/>
  <div className="container">
    <button className = "cardButton">View Portfolio</button>
  </div>
</div>
    </div>        
</div>)
}
export default HomePage;