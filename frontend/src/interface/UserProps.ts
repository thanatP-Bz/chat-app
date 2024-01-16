import { IUserMember } from "./IUserProps";

export interface UserProps {
  _id: string;
  name: string;
  pic: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
}
