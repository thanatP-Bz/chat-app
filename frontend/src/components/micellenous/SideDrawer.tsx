import { useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import {
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Input,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useDisclosure } from "@chakra-ui/hooks";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../User Avatars/UserListItem";
import { UserProps } from "../../interface/UserProps";
import { getSender } from "../../config/ChatLogics";
import { IUserProps } from "../../interface/IUserProps";

const SideDrawer = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );

      // Check if user is not found
      if (data.length === 0) {
        toast({
          title: "User Not Found",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        setLoading(false);
      } else {
        setSearchResult(data);
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const accessChat = async (userId: string) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Live Chats
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}

                {/* {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                     onClick={() => {
                      // Create a new object with properties from notif.chat
                      const selectedChatObject: IUserProps = {
                        _id: notif.chat._id,
                        name: "", // Set appropriate values based on your application logic
                        pic: "",
                        email: "",
                        token: "",
                        isGroupChat: notif.chat.isGroupChat,
                        chatName: notif.chat.chatName,
                        isAdmin: false, // Set appropriate values based on your application logic
                        createdAt: notif.chat.createAt,
                        updatedAt: notif.chat.updatedAt,
                        __v: 0, // Set appropriate values based on your application logic
                        sender: {
                          _id: "", // Set appropriate values based on your application logic
                          name: "",
                          pic: "",
                        },
                        content: "", // Set appropriate values based on your application logic
                        chat: {
                          _id: notif.chat._id,
                          chatName: notif.chat.chatName,
                          isGroupChat: notif.chat.isGroupChat,
                          createAt: notif.chat.createAt,
                          updatedAt: notif.chat.updatedAt,
                          users: notif.chat.users,
                        },
                        users: notif.chat.users, // Set appropriate values based on your application logic
                        groupAdmin: {
                          _id: "", // Set appropriate values based on your application logic
                          name: "",
                          email: "",
                          token: "",
                          pic: "",
                          isGroupChat: false, // Set appropriate values based on your application logic
                          chatName: "",
                          isAdmin: false, // Set appropriate values based on your application logic
                          createdAt: "",
                          updatedAt: "",
                          __v: 0, // Set appropriate values based on your application logic
                        },
                      };

                      // Set the new object to selectedChat
                      setSelectedChat(selectedChatObject);

                      // Remove the notification
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))} */}
              </MenuList>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user: UserProps) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
