import { create, edit, remove } from '../../services/user.service';
import { IUser, IUserDocument } from '../../db/models/User';
import { ID, Optional } from '../../types';

export default {
  createUser: async (obj: any, args: {user: IUser}): Promise<IUserDocument> => create(args.user),
  editUser: async (obj: any, args: {id: ID; user: Optional<IUser>}): Promise<IUserDocument> => edit(args.id, args.user),
  removeUser: (obj: any, args: {id: ID; apartment: IUser}): Promise<IUserDocument> => remove(args.id),
};
