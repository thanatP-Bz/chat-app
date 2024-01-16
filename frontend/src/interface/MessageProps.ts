import { IUserProps } from "./IUserProps";

export interface MessageProps {
  sender: {
    name: string;
    _id: string;
    pic: string;
  };
  content: string;
  chat: {
    _id: string;
    chatName: string;
    isGroupChat: false;
    users: IUserProps[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    latestMessage: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
