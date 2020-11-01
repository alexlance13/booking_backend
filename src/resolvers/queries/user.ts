import { IUser, IUserDocument } from '../../db/models/User';
import { getAll, getById, login } from '../../services/user.service';

export default {
  getUserById: (source, args: { id: string }): Promise<IUser> => getById(args.id),
  getAllUsers: (): Promise<IUserDocument[]> => getAll(),
  loginUser: (source, args: { email: string; password: string }): Promise<{token: string; user: IUserDocument}> => login(args),
};
