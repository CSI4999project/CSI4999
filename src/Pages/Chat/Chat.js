import { React, useContext, useState } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import ChatFeed from "../../components/ChatFeed";
import { TextField } from '@mui/material';
import "./ChatStyles.css";
import { UserContext } from "../../context/userContext";

const projectID = process.env.REACT_APP_PROJECT_ID;

const Chat = () => {
  let { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");

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
          placeholder="Search User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="dm-button" onClick={() => createDirectChat(creds)}>
          Start Chat
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
