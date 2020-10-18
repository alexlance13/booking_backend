const loggedInCheck = async (root, args, { user, operationName }, info, next): Promise<any> => {
  if (!(operationName === 'createUser') && !user) throw new Error('You should log in first');

  return next();
};

export default loggedInCheck;
