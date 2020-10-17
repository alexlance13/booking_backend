const isSellerCheck = async (root, args, { user }, info, next): Promise<any> => {
  if (!user || !user.role || user.role !== 'SELLER') throw new Error('You should be a seller');

  return next();
};

export default isSellerCheck;
