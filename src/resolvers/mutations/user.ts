import { create, edit, remove } from '../../services/user.service';
import { IUser, IUserDocument } from '../../db/models/User';
import { Optional } from '../../types';

export default {
  createUser: async (obj: any, args: {user: IUser}): Promise<{token: string; user: IUserDocument}> => create(args.user),
  editUser: async (obj: any, args: {id: string; user: Optional<IUser>}, context: {user: IUser}): Promise<IUserDocument> => edit(args.id, args.user, context),
  removeUser: (obj: any, args: {id: string; apartment: IUser}): Promise<IUserDocument> => remove(args.id),
};
