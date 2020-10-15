import { create } from '../../services/order.service';

export default {
  createOrder: (obj, args) => create(args.order),
};
