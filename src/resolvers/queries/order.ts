import { models } from '../../db';

export default {
  getOrderById: async (obj, args) => await models.order.findById(args.id),
  getAllOrders: async () => await models.order.find(),
};
