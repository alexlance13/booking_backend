import { models } from '../../db';

export default {
  getUserById: async (obj, args) => {
    const user = await models.user.findById(args.id);
    console.log(user, args);
    return user;
  },
};
