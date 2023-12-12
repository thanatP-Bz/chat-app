import { UserProps } from "../interface/UserProps";

export const getSender = (loggedUser: UserProps, users: UserProps[]) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
