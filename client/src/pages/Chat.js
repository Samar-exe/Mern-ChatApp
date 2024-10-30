import React, { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import UserChat from "../Chat/UserChat";
import { AuthContext } from "../contexts/AuthContext";
import {Container , Stack} from 'react-bootstrap'
import PotentialChats from "../Chat/PotentialChats";
import ChatBox from "../Chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading,updateCurrentChat } = useContext(ChatContext);
  return (
    <Container>
      <PotentialChats/>
      {userChats?.length < 1 ? null:(
        <Stack direction="horizontal" gap={4} className="align-items-start"> 
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading Chats...</p>}
            {userChats?.map((chat,index)=>{
              return(
                <div key = {index} onClick={()=>updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user}/>
                </div>
              )
            })}
          </Stack>
         <ChatBox/>
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
