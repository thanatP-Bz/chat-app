import { UserInfo } from "../components/MyChats";

type Users = {
  _id: string;
  name: string;
  email: string;
  pic: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const getSender = (loggedUser: UserInfo, users: Users[]) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
