import { UserInputError } from 'apollo-server-express';
import { models } from '../db';
import { IUser, IUserDocument } from '../db/models/User';
import { Optional } from '../types';

export const getById = (id: string): Promise<IUserDocument> => models.user.findById(id).exec();
export const getAll = (): Promise<IUserDocument[]> => models.user.find().exec();

export const edit = (id: string, user: Optional<IUser>, context: {user: IUser}): Promise<IUserDocument> => {
  if (id !== context.user._id.toString()) throw new Error('You can\'t edit another user');
  return models.user.findByIdAndUpdate(id, user, { new: true }).exec();
};

export const remove = async (id: string): Promise<IUserDocument> => {
  try {
    await models.user.findById(id);
  } catch (e) {
    throw new Error('User with this id is not defined');
  }
  return models.user.findByIdAndRemove(id).exec();
};

export const create = async (user: IUser): Promise<{token: string; user: IUserDocument}> => {
  if (await models.user.findOne({ email: user.email })) throw new Error('Email already exist');
  const createdUser = await models.user.create(user);
  const token = await createdUser.jwtSign();
  return { token, user: createdUser };
};

export const login = async (args: {email: string; password: string}): Promise<{token: string; user: IUserDocument}> => {
  const user = await models.user.findOne({ email: args.email });
  if (user && user.verifyPassword(args.password)) {
    const token = await user.jwtSign();
    return { token, user };
  }
  throw new UserInputError('AuthError', { credentials: 'Invalid credentials' });
};
