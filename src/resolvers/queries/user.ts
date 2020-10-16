import { IUserDocument } from '../../db/models/user';
import { getAll, getById, login } from '../../services/user.service';
import { ID } from '../../types';

export default {
  getUserById: (obj: any, args: {id: ID}): Promise<IUserDocument> => getById(args.id),
  getAllUsers: (): Promise<IUserDocument[]> => getAll(),
  loginUser: (obj: any, args: {email: String; password: String}): Promise<String> => login(args),
};
