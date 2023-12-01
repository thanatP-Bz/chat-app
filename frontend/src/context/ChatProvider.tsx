import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface IContextProps {
  user: string | null;
}

const ChatContext = createContext({} as IContextProps);

type Children = {
  children: ReactNode;
};

const ChatProvider = ({ children }: Children) => {
  const [user, setUser] = useState<string | null>("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo: string | null = localStorage.getItem("userInfo");
    setUser(userInfo);

    if (!userInfo) {
      navigate("/chats");
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
