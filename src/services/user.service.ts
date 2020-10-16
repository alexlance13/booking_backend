import { UserInputError } from 'apollo-server-express';
import { models } from '../db';
import { IUser, IUserDocument } from '../db/models/User';
import { Optional, ID } from '../types';

export const getById = (id: ID): Promise<IUserDocument> => models.user.findById(id).exec();
export const getAll = (): Promise<IUserDocument[]> => models.user.find().exec();
export const edit = (id: ID, user: Optional<IUser>): Promise<IUserDocument> => models.user.findByIdAndUpdate(id, user, { new: true }).exec();
export const remove = (id: ID): Promise<IUserDocument> => models.user.findByIdAndRemove(id).exec();

export const create = async (user: IUser): Promise<String> => {
  if (await models.user.findOne({ email: user.email })) throw new Error('Email already exist');
  const createdUser = await models.user.create(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = await createdUser.jwtSign();
  return token;
};

export const login = async (args: {email: String; password: String}): Promise<String> => {
  const user = await models.user.findOne({ email: args.email });
  if (user && user.verifyPassword(args.password)) {
    const token = await user.jwtSign();
    return token;
  }
  throw new UserInputError('AuthError', { credentials: 'Invalid credentials' });
};
