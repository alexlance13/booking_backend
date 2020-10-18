import { models } from '../../db';

const auth = async (root, args, context, info, next): Promise<any> => {
  if (context.auth && context.auth.split(' ')[0] === 'Bearer') {
    const token = context.auth.split(' ')[1];
    if (await models.user.jwtVerify(token)) {
      context.user = await models.user.jwtVerify(token);
    }
  } else context.user = null;
  return next();
};

export default auth;
