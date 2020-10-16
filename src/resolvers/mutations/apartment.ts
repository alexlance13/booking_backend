import { create, edit, remove } from '../../services/apartment.service';
import { IApartment, IApartmentDocument } from '../../db/models/Apartment';
import { ID, Optional } from '../../types';

export default {
  createApartment: (obj: any, args: {apartment: IApartment}): Promise<IApartmentDocument> => create(args.apartment),
  editApartment: (obj: any, args: {id: ID; apartment: Optional<IApartment>}): Promise<IApartmentDocument> => edit(args.id, args.apartment),
  removeApartment: (obj: any, args: {id: ID; apartment: IApartment}): Promise<IApartmentDocument> => remove(args.id),
};
