import { IUser, IUserDocument } from '../../db/models/User';
import { getAll, getById, login } from '../../services/user.service';

export default {
  getUserById: (obj: any, args: {id: string}): Promise<IUser> => getById(args.id),
  getAllUsers: (): Promise<IUserDocument[]> => getAll(),
  loginUser: (obj: any, args: {email: string; password: string}): Promise<{token: string; user: IUserDocument}> => login(args),
};
