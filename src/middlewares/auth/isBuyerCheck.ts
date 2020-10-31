import { ForbiddenError } from 'apollo-server-express';
import { IUser } from '../../types';

const isBuyerCheck = async (root, args, { user }: { user: IUser }, info, next): Promise<any> => {
  if (user?.role !== 'BUYER') throw new ForbiddenError('You should be a buyer');

  return next();
};

export default isBuyerCheck;
