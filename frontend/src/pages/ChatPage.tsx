import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";

const ChatPage = () => {
  const fetchChats = async () => {
    try {
      const data: AxiosResponse = await axios.get(
        "http://localhost:5000/api/chat"
      );
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div>ChatPage</div>;
};

export default ChatPage;
