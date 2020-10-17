import { IUserDocument } from '../../db/models/user';
import { getAll, getById, login } from '../../services/user.service';

export default {
  getUserById: (obj: any, args: {id: string}): Promise<IUserDocument> => getById(args.id),
  getAllUsers: (): Promise<IUserDocument[]> => getAll(),
  loginUser: (obj: any, args: {email: string; password: string}): Promise<{token: string; user: IUserDocument}> => login(args),
};
