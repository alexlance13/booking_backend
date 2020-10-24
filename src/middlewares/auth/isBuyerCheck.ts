import { ForbiddenError } from 'apollo-server-express';

const isBuyerCheck = async (root, args, { user }, info, next): Promise<any> => {
  if (!user || !user.role || user.role !== 'BUYER') throw new ForbiddenError('You should be a buyer');

  return next();
};

export default isBuyerCheck;
