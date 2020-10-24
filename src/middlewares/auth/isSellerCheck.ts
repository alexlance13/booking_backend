import { ForbiddenError } from 'apollo-server-express';

const isSellerCheck = async (root, args, { user }, info, next): Promise<any> => {
  if (!user || !user.role || user.role !== 'SELLER') throw new ForbiddenError('You should be a seller');

  return next();
};

export default isSellerCheck;
