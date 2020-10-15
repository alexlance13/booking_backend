import { create, edit, remove } from '../../services/apartment.service';

export default {
  createApartment: (obj, args) => create(args.apartment),
  editApartment: (obj, args) => edit(args.id, args.apartment),
  removeApartment: (obj, args) => remove(args.id),
};
