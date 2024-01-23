import { UserProps } from "../interface/UserProps";
import { MessageProps } from "../interface/MessageProps";
import { IUserProps } from "../interface/IUserProps";

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
export const getSender = (loggedUser: IUserProps, users: IUserProps[]) => {
  if (users.length >= 2) {
    if (users[0]?._id === loggedUser?._id) {
      return users[1]?.name || "Unknown Sender";
    } else {
      return users[0]?.name || "Unknown Sender";
    }
  }
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
  console.log(currentMessage.sender._id);
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
