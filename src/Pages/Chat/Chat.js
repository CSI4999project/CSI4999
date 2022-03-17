import React from "react";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "../../components/ChatFeed";
import "./ChatStyles.css";

const projectID = "30b4e465-4a50-4211-96fe-c5cacba94eeb";

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
