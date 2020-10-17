// @ts-nocheck
const loggedInCheck = async (root, args, { user }, info, next): Promise<any> => {
  if (!user) throw new Error('You should log in first');

  return next();
};

export default loggedInCheck;
