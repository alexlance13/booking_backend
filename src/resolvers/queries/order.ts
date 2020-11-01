import { IOrderDocument } from '../../db/models/Order';
import { getAll, getById } from '../../services/order.service';

export default {
  getOrderById: (source, args: { id: string }): Promise<IOrderDocument> => getById(args.id),
  getAllOrders: (): Promise<IOrderDocument[]> => getAll(),
};
