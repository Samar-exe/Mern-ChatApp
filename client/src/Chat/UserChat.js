import React, { useContext } from "react";
import useFetchRecipientUser from "../hooks/useFetchRecipientUser";
import { Stack } from "react-bootstrap";
import avatar from '../assets/avatar.svg'
import { ChatContext } from "../contexts/ChatContext";

const UserChat = ({chat, user}) => {
    const {recipientUser} =  useFetchRecipientUser(chat, user);
    const {onlineUsers} = useContext(ChatContext)

    const isOnline =  onlineUsers?.some((user) => user?.userId === recipientUser?._id)
    
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2"><img src={avatar} height="35px" alt=""/></div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Messages</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date"></div>
        <div className={isOnline?"user-online":""}></div>
      </div>
    </Stack>
  );
};

export default UserChat;
