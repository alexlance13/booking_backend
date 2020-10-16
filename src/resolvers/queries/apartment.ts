import { getAll, getById } from '../../services/apartment.service';

export default {
  getApartmentById: (obj, args) => getById(args.id),
  getAllApartments: () => getAll(),
};
