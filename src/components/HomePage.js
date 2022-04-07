import react from "react";
import homepage from "../homepage.css";
import video from "./Images/BackgroundVideo.mp4";

const HomePage = () => {
    return (
    <div className = "body"><video loop autoPlay>
        <source
          src={video}
          type="video/mp4"
        />
      </video>
    <div className = "top">
        <h1 className = "header">Welcome</h1>
        </div>       
</div>)
}
export default HomePage;