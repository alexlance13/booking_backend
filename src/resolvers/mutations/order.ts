import { models } from '../../db';

export default {
  createOrder: async (obj, args) => await models.order.create(args.order),
};
