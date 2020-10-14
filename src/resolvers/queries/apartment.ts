import { models } from '../../db';

export default {
  getApartmentById: async (obj, args) =>
    await models.apartment.findById(args.id),
  getAllApartments: async () => await models.apartment.find(),
};
