export const getSender = (
  loggedUser: { _id: string } | undefined,
  users: { _id: string; name: string }[]
) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
