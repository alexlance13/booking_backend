import { UserInputError } from 'apollo-server-express';
import { models } from '../db';
import { IApartment, IApartmentDocument } from '../db/models/Apartment';
import { IUser } from '../db/models/user';
import { Optional } from '../types';

export const getById = (id: string): Promise<IApartmentDocument> => models.apartment.findById(id).exec();
export const getAll = (): Promise<IApartmentDocument[]> => models.apartment.find().exec();

export const create = async (apartment: IApartment, user: IUser): Promise<IApartmentDocument> => {
  const newApartment = await models.apartment.create({ ...apartment, seller: user._id });
  console.log(`Apartment ${newApartment} was successfully created`);
  return newApartment;
};

export const edit = async (id: string, apartment: Optional<IApartment>, user: IUser): Promise<IApartmentDocument> => {
  if (!(await models.apartment.findOne({ _id: id, seller: user._id }))) throw new UserInputError('Apartment is not defined');
  const editedApartment = await models.apartment.findByIdAndUpdate(id, apartment, { new: true }).exec();
  console.log(`Apartment ${editedApartment} was successfully edited`);
  return editedApartment;
};

export const remove = async (id: string, user: IUser): Promise<IApartmentDocument> => {
  if (!(await models.apartment.findOne({ _id: id, seller: user._id }))) throw new UserInputError('Apartment is not defined');
  const apartment = await models.apartment
    .findByIdAndRemove(id)
    .populate('seller')
    .exec();
  console.log(`Apartment ${apartment} was successfully removed`);
  return apartment;
};
