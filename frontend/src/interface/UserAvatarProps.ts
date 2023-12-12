export interface UserAvatarProps {
  user: {
    _id: string;
    name: string;
    pic: string;
    email: string;
  };
  handleFunction: () => Promise<void>;
}
