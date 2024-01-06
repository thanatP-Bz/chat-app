export interface MessageUsersProps {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

export interface MessageProps {
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
    createAt: string;
    updatedAt: string;
  };
  users: MessageProps[];
  _id: string;
  createAt: string;
  updatedAt: string;
  __0: number;
}
