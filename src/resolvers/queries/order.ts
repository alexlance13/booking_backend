import { IOrderDocument } from '../../db/models/order';
import { getAll, getById } from '../../services/order.service';

export default {
  getOrderById: (obj: any, args: {id: string}, context: any): Promise<IOrderDocument> => { console.log(context.user); return getById(args.id); },
  getAllOrders: (): Promise<IOrderDocument[]> => getAll(),
};
