import { React, useContext } from "react";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "../../components/ChatFeed";
import "./ChatStyles.css";
import { UserContext } from "../../context/userContext"

const projectID = process.env.REACT_APP_PROJECT_ID;

const Chat = () => {

  let {user, setUser} = useContext(UserContext);

  return (
    <ChatEngine
      height="90vh"
      projectID={projectID}
      userName={user.username}
      userSecret={process.env.REACT_APP_CHAT_PASSWORD}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default Chat;
