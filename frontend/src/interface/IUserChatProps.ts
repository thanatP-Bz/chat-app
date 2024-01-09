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
  users: IUserMember[];
  groupAdmin: IUserMember;
}
