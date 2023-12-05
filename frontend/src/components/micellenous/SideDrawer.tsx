import React from "react";
import { ChatState } from "../../context/ChatProvider";

const SideDrawer = () => {
  const { user } = ChatState();
  return <div>{user._id}</div>;
};

export default SideDrawer;
