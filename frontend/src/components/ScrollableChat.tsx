import { Avatar, Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";

import { MessageProps } from "../interface/MessageProps";

interface IMessagesProps {
  messages: MessageProps[];
}

const ScrollableChat = ({ messages }: IMessagesProps) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((currentMessage, i) => (
          <div style={{ display: "flex" }} key={currentMessage._id}>
            {(isSameSender(messages, currentMessage, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={currentMessage.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={currentMessage.sender.name}
                  src={currentMessage.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  currentMessage.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(
                  messages,
                  currentMessage,
                  i,
                  user._id
                ),
                marginTop: isSameUser(messages, currentMessage, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {currentMessage.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
