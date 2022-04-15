import { React, useContext, useState, useEffect } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import ChatFeed from "../../components/ChatFeed";
import "./ChatStyles.css";
import { UserContext } from "../../context/userContext";
import {useLocation} from 'react-router-dom';

const projectID = process.env.REACT_APP_PROJECT_ID;
console.log(projectID)
const Chat = () => {
  let { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [isLoaded]);
  
 

  useEffect(() =>{
    if(isLoaded && location.state !== null){
      console.log("ce-chat-card-title-" + location.state.name)
      if(document.getElementById("ce-chat-card-title-" + location.state.name) !== null){
        document.getElementById("ce-chat-card-title-" + location.state.name).click();
      } else{
        setUsername(location.state.name)
      }
    } 
  }, [isLoaded])

  useEffect(()=>{
    if(location.state !== null && username == location.state.name){
      document.getElementById('createChat').click();
    }
  }, [username])
  
  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }
  function renderChatForm(creds) {
    return (
      <div>
        <input
          className="create-new-chat"
          id="input"
          placeholder="Search User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="dm-button" id="createChat" onClick={() => createDirectChat(creds)}>
          Create Chat
        </button>
      </div>
    );
  }

  return (
    <ChatEngine
      height="90vh"
      projectID={projectID}
      userName={user.username}
      userSecret={process.env.REACT_APP_CHAT_PASSWORD}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      renderNewChatForm={(creds) => renderChatForm(creds)}
      onNewMessage={() =>
        new Audio(
          "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        ).play()
      }
    />
  );
};

export default Chat;
