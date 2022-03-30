import React from "react";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "../../components/ChatFeed";
import "./ChatStyles.css";

const projectID = process.env.REACT_APP_PROJECT_ID;

const Chat = () => {
  return (
    <ChatEngine
      height="90vh"
      projectID={projectID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default Chat;
