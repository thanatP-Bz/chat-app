import { UserProps } from "../interface/UserProps";
import { MessageProps } from "../interface/MessageProps";

export const isSameSenderMargin = (
  messages: MessageProps[],
  currentMessage: MessageProps,
  i: number,
  userId: string
) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === currentMessage.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== currentMessage.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (
  messages: MessageProps[],
  currentMessage: MessageProps,
  i: number
) => {
  return i > 0 && messages[i - 1].sender._id === currentMessage.sender._id;
};

/* get sender */
export const getSender = (loggedUser: UserProps, users: UserProps[]) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser: UserProps, users: UserProps[]) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (
  messages: MessageProps[],
  currentMessage: MessageProps,
  i: number,
  userId: string
) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== currentMessage.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (
  messages: MessageProps[],
  i: number,
  userId: string
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
