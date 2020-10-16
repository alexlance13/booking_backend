import { models } from '../db';
import { IApartment, IApartmentDocument } from '../db/models/Apartment';
import { Optional, ID } from '../types';

export const getById = (id: ID): Promise<IApartmentDocument> => models.apartment.findById(id).exec();
export const getAll = (): Promise<IApartmentDocument[]> => models.apartment.find().exec();
export const create = (apartment: IApartment): Promise<IApartmentDocument> => models.apartment.create(apartment);
export const edit = (id: ID, apartment: Optional<IApartment>): Promise<IApartmentDocument> => models.apartment.findByIdAndUpdate(id, apartment, { new: true }).exec();
export const remove = (id: ID): Promise<IApartmentDocument> => models.apartment.findByIdAndRemove(id).populate('seller').exec();
