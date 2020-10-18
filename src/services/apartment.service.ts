import { models } from '../db';
import { IApartment, IApartmentDocument } from '../db/models/Apartment';
import { IUser } from '../db/models/user';
import { Optional } from '../types';

export const getById = (id: string): Promise<IApartmentDocument> => models.apartment.findById(id).exec();
export const getAll = (): Promise<IApartmentDocument[]> => models.apartment.find().exec();
export const create = (apartment: IApartment, user: IUser): Promise<IApartmentDocument> => {
  if (apartment.seller !== user._id.toString()) throw new Error('Forbidden');
  return models.apartment.create(apartment);
};

export const edit = async (id: string, apartment: Optional<IApartment>, context: {user: IUser}): Promise<IApartmentDocument> => {
  const aps = await models.apartment.findById(id);
  if (!aps) throw new Error('Apartment is not defined');
  console.log(context.user);
  if (aps.seller._id !== context.user._id) throw new Error('Forbidden');
  return models.apartment.findByIdAndUpdate(id, apartment, { new: true }).exec();
};

export const remove = async (id: string, context: {user: IUser}): Promise<IApartmentDocument> => {
  const aps = await models.apartment.findById(id);
  if (!aps) throw new Error('Apartment is not defined');
  if (aps.seller._id !== context.user._id) throw new Error('Forbidden');
  return models.apartment.findByIdAndRemove(id).populate('seller').exec();
};
