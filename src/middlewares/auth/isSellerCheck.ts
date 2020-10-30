import { ForbiddenError } from 'apollo-server-express';
import { IUser } from '../../types';

const isSellerCheck = async (root, args, { user }: {user: IUser}, info, next): Promise<any> => {
  if (!user || !user.role || user.role !== 'SELLER') throw new ForbiddenError('You should be a seller');

  return next();
};

export default isSellerCheck;
