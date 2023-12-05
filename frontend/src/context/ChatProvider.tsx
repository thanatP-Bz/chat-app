import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  pic: string;
  email: string;
};

interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  user: {
    _id: "",
    name: "",
    pic: "",
    email: "",
  },
} as UserContextInterface;

const ChatContext = createContext(defaultState);

type Children = {
  children: ReactNode;
};

const ChatProvider = ({ children }: Children) => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    pic: "",
    email: "test@gmail.com",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
    setUser(userInfo);

    if (!userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatProvider };
