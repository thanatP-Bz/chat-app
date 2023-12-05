import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import {
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
            {/* <MenuList></MenuList> */}
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
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default SideDrawer;
