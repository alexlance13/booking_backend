// @ts-nocheck
const loggedInCheck = async (root, args, { user }, info, next): Promise<any> => {
  if (!user) throw new Error('You should log in first');

  console.log(user);

  return next();
};

export default loggedInCheck;
