import { createContext, useState, useEffect, useCallback } from "react";
import { getRequest, base_URL, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ user, children }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  
  //========== initialize socket ================
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket); 
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //==========Add Online Users====================
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket,user]);

  //=========SEND MESSAGES===================
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage,currentChat,socket,user]);

  //==============RECIEVE MESSAGES AND NOTIFICATIONS====================
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  //=======================GET USERS=============================
  useEffect(
    (user) => {
      const getUsers = async () => {
        const response = await getRequest(`${base_URL}/users`);
        if (response.error) {
          return console.log("Error fetching users", response);
        }
        const pChats = response.filter((u) => {
          let isChatCreated = false;
          if (user?._id === u._id) return false;

          if (userChats) {
            isChatCreated = userChats?.some((chat) => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }
          return !isChatCreated;
        });
        setPotentialChats(pChats);
      };
      getUsers();
    },
    [userChats]
  );

  //=========================GET USER CHATS===========================
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${base_URL}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  //===================GET MESSAGES==================================
  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessageError(null);
      const response = await getRequest(
        `${base_URL}/messages/${currentChat?._id}`
      );
      setIsMessageLoading(false);
      if (response.error) {
        return setMessageError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  //==================SEND TEXT MESSAGE===============================
  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something");
      const response = await postRequest(
        `${base_URL}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  //===================CREATE CHATS========================================
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${base_URL}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessageLoading,
        messageError,
        currentChat,
        sendTextMessage,
        sendTextMessageError,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
