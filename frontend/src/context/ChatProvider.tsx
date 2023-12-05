import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
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

type ChildrenProp = {
  children: ReactNode;
};

const ChatProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    pic: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage?.getItem("userInfo") || "");
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user }}>{children}</ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatProvider };
