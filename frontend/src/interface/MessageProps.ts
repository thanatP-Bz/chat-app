export interface MessageProps {
  content: string;
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    pic: string;
  };
  createAt: string;
  updatedAt: string;
  __v: number;
}
