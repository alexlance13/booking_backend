import { models } from '../../db';

const auth = async (root, args, context, info, next): Promise<any> => {
  const [type, token] = context?.auth?.split(' ');
  if (type === 'Bearer') {
    const user = await models.user.jwtVerify(token);
    if (user) context.user = user;
  }
  return next();
};

export default auth;
