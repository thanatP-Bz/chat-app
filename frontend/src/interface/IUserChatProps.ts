import { IUserMember } from "./IUserProps";

export interface IUserChatProps {
  _id: string;
  name: string;
  pic: string;
  email: string;
  token: string;
  isGroupChat: boolean;
  chatName: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sender: {
    _id: string;
    name: string;
    pic: string;
  };
  content: string;
  chat: {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: IUserMember[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    latestMessage: string;
  };
  users: IUserMember[];
  groupAdmin: IUserMember;
}
