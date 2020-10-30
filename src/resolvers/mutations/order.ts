import { create, edit, remove } from '../../services/order.service';
import { IOrder, IOrderDocument } from '../../db/models/Order';
import { IOrderInput, Optional } from '../../types';
import { IUser } from '../../db/models/user';

export default {
  createOrder: (obj: any, args: {order: IOrderInput}, context: {user: IUser}): Promise<IOrderDocument> => create(args.order, context.user),
  editOrder: (obj: any, args: {id: string; order: Optional<IOrder>}): Promise<IOrderDocument> => edit(args.id, args.order),
  removeOrder: (obj: any, args: {id: string; order: IOrder}): Promise<IOrderDocument> => remove(args.id),
};
