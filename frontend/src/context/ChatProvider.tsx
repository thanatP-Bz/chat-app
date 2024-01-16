import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { IUserProps } from "../interface/IUserProps";
import { IUserChatProps } from "../interface/IUserChatProps";
import { MessageProps } from "../interface/MessageProps";

interface UserContextInterface {
  user: IUserProps;
  setUser: Dispatch<SetStateAction<IUserProps>>;
  selectedChat: "" | IUserProps;
  setSelectedChat: Dispatch<SetStateAction<"" | IUserProps>>;
  chats: IUserChatProps[];
  setChats: Dispatch<SetStateAction<IUserChatProps[]>>;
  notification: MessageProps[];
  setNotification: Dispatch<SetStateAction<MessageProps[]>>;
}

const defaultState = {
  user: {
    _id: "",
    name: "",
    pic: "",
    email: "",
    token: "",
  },
  selectedChat: {},
  chats: [],
} as unknown as UserContextInterface;

const ChatContext = createContext(defaultState);

type ChildrenProp = {
  children: ReactNode;
};

const ChatProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState<IUserProps>({
    _id: "",
    name: "",
    pic: "",
    email: "",
    token: "",
    isGroupChat: false,
    chatName: "",
    isAdmin: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
    users: [],
    groupAdmin: {
      _id: "",
      name: "",
      pic: "",
      email: "",
      token: "",
      isGroupChat: false,
      chatName: "",
      isAdmin: false,
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
    sender: {
      _id: "",
      name: "",
      pic: "",
    },
    content: "",
    chat: {
      _id: "",
      chatName: "",
      isGroupChat: false,
      createdAt: "",
      updatedAt: "",
      users: [],
      __v: 0,
      latestMessage: "",
    },
  });
  const [notification, setNotification] = useState<MessageProps[]>([
    {
      sender: {
        name: "",
        _id: "",
        pic: "",
      },
      content: "",
      chat: {
        _id: "",
        chatName: "",
        isGroupChat: false,
        users: [],
        createdAt: "",
        updatedAt: "",
        __v: 0,
        latestMessage: "",
      },
      _id: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  ]);
  const [selectedChat, setSelectedChat] = useState<"" | IUserProps>("");
  const [chats, setChats] = useState<IUserChatProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userInfoString = localStorage?.getItem("userInfo");
      if (!userInfoString) {
        navigate("/");
        return;
      }

      const userInfo = JSON.parse(userInfoString);
      setUser(userInfo);
    } catch (error) {
      console.error(`Error parsing user info JSON`, (error as Error).message);
      navigate("/");
    }
  }, [navigate, setUser]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatProvider };
