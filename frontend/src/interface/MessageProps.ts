interface UsersProps {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

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
    isGroupChat: boolean;
    users: UsersProps[];
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
