import { models } from '../../db';

export default {
  createApartment: async (obj, args) =>
    await models.apartment.create(args.apartment),
  editApartment: async (obj, args) =>
    await models.apartment.findByIdAndUpdate(args.id, args.apartment),
  deleteApartment: async (obj, args) =>
    await models.apartment.findByIdAndDelete(args.id),
};
