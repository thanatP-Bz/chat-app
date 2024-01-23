import { ReactNode } from "react";

export interface IUserMember {
  _id: string;
  name: string;
  email: string;
  token: string;
  pic: string;
  isGroupChat: boolean;
  chatName: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserProps {
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
    users: [
      {
        _id: string;
        name: string;
        email: string;
        token: string;
        pic: string;
        isGroupChat: boolean;
        chatName: string;
        isAdmin: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
    ];
    createdAt: string;
    updatedAt: string;
    __v: number;
    latestMessage: string;
  };
  users: [];
  groupAdmin: IUserMember;
  children?: ReactNode;
}
