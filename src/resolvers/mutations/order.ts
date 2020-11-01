import { create, edit, remove } from '../../services/order.service';
import { IOrder, IOrderDocument } from '../../db/models/Order';
import { IOrderInput, Optional } from '../../types';
import { IUser } from '../../db/models/User';

export default {
  createOrder: (source, args: { order: IOrderInput }, context: { user: IUser}): Promise<IOrderDocument> => create(args.order, context.user),
  editOrder: (source, args: { id: string; order: Optional<IOrder> }): Promise<IOrderDocument> => edit(args.id, args.order),
  removeOrder: (source, args: { id: string; order: IOrder }): Promise<IOrderDocument> => remove(args.id),
};
