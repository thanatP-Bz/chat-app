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
import { MessageProps } from "../interface/MessageProps";

export type IUserMember = {
  _id: string;
  name: string;
  email: string;
  token: string;
  pic: string;
  isGroupChat: boolean;
  chatName: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IUser = {
  _id: string;
  name: string;
  pic: string;
  email: string;
  token: string;
  isGroupChat: boolean;
  chatName: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  users: IUserMember[];
  groupAdmin: IUserMember;
  children?: ReactNode;
};

type IUserChat = {
  _id: string;
  name: string;
  pic: string;
  email: string;
  token: string;
  isGroupChat: boolean;
  chatName: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  users: IUserMember[];
  groupAdmin: IUserMember;
};

interface UserContextInterface {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  selectedChat: "" | IUser;
  setSelectedChat: Dispatch<SetStateAction<"" | IUser>>;
  chats: IUserChat[];
  setChats: Dispatch<SetStateAction<IUserChat[]>>;
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
  const [user, setUser] = useState<IUser>({
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
  });
  const [selectedChat, setSelectedChat] = useState<"" | IUser>("");
  const [chats, setChats] = useState<IUserChat[]>([]);
  const [notification, setNotification] = useState<MessageProps[]>([]);

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
