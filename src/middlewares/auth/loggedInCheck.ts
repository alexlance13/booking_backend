import { ForbiddenError } from 'apollo-server-express';
import { IUser } from '../../types';

const loggedInCheck = async (root, args, { user, operationName }: {user: IUser; operationName: string}, info, next): Promise<any> => {
  if (!(operationName === 'createUser') && !user) throw new ForbiddenError('You should log in first');

  return next();
};

export default loggedInCheck;
