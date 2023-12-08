interface LoggedUserProps {
  loggedUser: {
    _id: string;
    name: string;
    email: string;
    pic: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface UsersProps {
  _id: string;
  name: string;
  email: string;
  pic: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getSender = (loggedUser: LoggedUserProps, users: UsersProps[]) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
