import { create, edit, remove } from '../../services/order.service';
import { IOrder, IOrderDocument } from '../../db/models/Order';
import { ID, Optional } from '../../types';

export default {
  createOrder: (obj: any, args: {order: IOrder}): Promise<IOrderDocument> => create(args.order),
  editOrder: (obj: any, args: {id: ID; order: Optional<IOrder>}): Promise<IOrderDocument> => edit(args.id, args.order),
  removeOrder: (obj: any, args: {id: ID; order: IOrder}): Promise<IOrderDocument> => remove(args.id),
};
