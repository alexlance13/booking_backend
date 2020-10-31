import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express';
import { models } from '../db';
import { IUser, IUserDocument } from '../db/models/User';
import { Optional, IAuthUser } from '../types';

export const getById = async (id: string): Promise<IUser> => {
  const user = await models.user.findById(id).lean().exec();
  switch (user?.role) {
    case 'SELLER':
      user.apartments = await models.apartment.find({ seller: user._id });
      user.vouchers = await models.voucher.find({ seller: user._id });
      break;
    case 'BUYER':
      user.bookings = await models.booking.find({ buyer: user._id });
      user.orders = await models.order.find({ buyer: user._id });
      break;
    default:
      console.log(`The user ${id} is not a seller or a buyer`);
  }
  return user;
};
export const getAll = (): Promise<IUserDocument[]> => models.user.find().exec();

export const edit = (id: string, user: Optional<IUser>, context: { user: IUser }): Promise<IUserDocument> => {
  if (id !== context.user._id.toString()) throw new ForbiddenError("You can't edit another user");
  const editedUser = models.user.findByIdAndUpdate(id, user, { new: true }).exec();
  console.log(`User ${editedUser} was successfully edited`);
  return editedUser;
};

export const remove = async (id: string): Promise<IUserDocument> => {
  const user = models.user.findByIdAndRemove(id).exec();
  if (!user) throw new UserInputError('User with this id is not defined');
  console.log(`User ${user} was successfully removed`);
  return user;
};

export const create = async (user: IUser): Promise<IAuthUser> => {
  if (await models.user.findOne({ email: user.email })) throw new AuthenticationError('Email already exist');
  if (user.role === 'ADMIN') throw new ForbiddenError("You can't create an Admin");
  const createdUser = await models.user.create(user);
  const token = await createdUser.jwtSign();
  console.log(`User ${createdUser} was successfully created`);
  return { token, user: createdUser };
};

export const login = async (args: { email: string; password: string }): Promise<IAuthUser> => {
  const user = await models.user.findOne({ email: args.email });
  if (user && (await user.verifyPassword(args.password))) {
    const token = await user.jwtSign();
    console.log(`User ${user} was successfully logged in`);
    return { token, user };
  }
  throw new AuthenticationError('Invalid credentials');
};
