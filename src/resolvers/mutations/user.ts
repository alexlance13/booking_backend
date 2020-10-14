import { models } from '../../db';

export default {
  createUser: async (obj, args) => {
    const user = await models.user.create(args.user);
    return user;
  },
};
