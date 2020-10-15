import { getAll, getById } from '../../services/order.service';

export default {
  getOrderById: (obj, args) => getById(args.id),
  getAllOrders: () =>  getAll(),
};
