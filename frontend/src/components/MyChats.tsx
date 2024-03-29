import { useState, useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Stack, useToast, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./micellenous/GroupChatModal";
import { IUserProps } from "../interface/IUserProps";

interface FetchProps {
  fetchAgain: boolean;
}

const MyChats = ({ fetchAgain }: FetchProps) => {
  const [loggedUser, setLoggedUser] = useState<IUserProps>({
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
      users: [
        {
          _id: "",
          name: "",
          email: "",
          token: "",
          pic: "",
          isGroupChat: false,
          chatName: "",
          isAdmin: false,
          createdAt: "",
          updatedAt: "",
          __v: 0,
        },
      ],
      __v: 0,
      latestMessage: "",
    },
  });
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:5000/api/chat",
          config
        );

        setChats(data);
      } catch (error) {
        console.error(error);

        toast({
          title: "Error Occurred!",
          description: "Failed to load the chats.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    setLoggedUser(JSON.parse(localStorage.getItem("userInfo") || ""));
    fetchChats(); // Call the fetchChats function immediately
  }, [setChats, fetchAgain, user.token, toast]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                <div></div>
                {/*   {chat.latestMessage && (
                  <Text fontSize="xs">
                  <b>{chat.latestMessage.sender.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                    </Text>
                  )} */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
