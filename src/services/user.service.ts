import { models } from '../db';

export const create = async user => models.user.create(user);
export const getById = async id => models.user.findById(id);


