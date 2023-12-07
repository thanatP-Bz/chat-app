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

type User = {
  _id: string;
  name: string;
  pic: string;
  email: string;
  token: string;
};

interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  selectedChat: User;
  setSelectedChat: Dispatch<SetStateAction<User>>;
  chats: User[];
  setChats: Dispatch<SetStateAction<User[]>>;
}

const defaultState = {
  user: {
    _id: "",
    name: "",
    pic: "",
    email: "",
    token: "",
  },
  selectedChat: {
    _id: "",
    name: "",
    pic: "",
    email: "",
    token: "",
  },
  chats: [],
} as unknown as UserContextInterface;

const ChatContext = createContext(defaultState);

type ChildrenProp = {
  children: ReactNode;
};

const ChatProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    pic: "",
    email: "",
    token: "",
  });
  const [selectedChat, setSelectedChat] = useState<User>({
    _id: "",
    name: "",
    pic: "",
    email: "",
    token: "",
  });
  const [chats, setChats] = useState<User[]>([]);

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
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatProvider };
