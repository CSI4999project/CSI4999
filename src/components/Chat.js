import React, {useContext} from 'react'
import { ChatEngine } from 'react-chat-engine'
import { UserContext } from '../context/userContext'
import ChatFeed from './ChatFeed'
import './ChatStyles.css'

const Chat = () => {

  let {user, setUser} = useContext(UserContext);

  return (
    <ChatEngine 
        height="90vh"
        projectID="30b4e465-4a50-4211-96fe-c5cacba94eeb"
        userName= "riocapollari"
        userSecret="secret"
       renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  )
}

export default Chat