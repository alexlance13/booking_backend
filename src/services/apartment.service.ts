import { models } from '../db';

export const getById = (id) => models.apartment.create(id);
export const getAll = () => models.apartment.find();
export const create = (apartment) => models.apartment.create(apartment);
export const edit = (id, apartment) => models.apartment.findByIdAndUpdate(id, apartment);
export const remove = (id) => models.apartment.findByIdAndRemove(id);
