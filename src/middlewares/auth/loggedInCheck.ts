import { ForbiddenError } from 'apollo-server-express';

const loggedInCheck = async (root, args, { user, operationName }, info, next): Promise<any> => {
  if (!(operationName === 'createUser') && !user) throw new ForbiddenError('You should log in first');

  return next();
};

export default loggedInCheck;
