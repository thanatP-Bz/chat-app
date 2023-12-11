import { UserInfo } from "../components/MyChats";

export const getSender = (
  loggedUser: UserInfo,
  users: {
    _id: string;
    name: string;
    email: string;
    pic: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[]
) => {
  return users[0]?._id === loggedUser?._id
    ? console.log("yes")
    : console.log("no");
};
