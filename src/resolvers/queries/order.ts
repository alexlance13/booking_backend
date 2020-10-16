import { IOrderDocument } from '../../db/models/order';
import { getAll, getById } from '../../services/order.service';
import { ID } from '../../types';

export default {
  getOrderById: (obj: any, args: {id: ID}, context: any): Promise<IOrderDocument> => { console.log(context.user); return getById(args.id); },
  getAllOrders: (): Promise<IOrderDocument[]> => getAll(),
};
