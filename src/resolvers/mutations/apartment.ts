import { create, edit, remove } from '../../services/apartment.service';
import { IApartment, IApartmentDocument } from '../../db/models/Apartment';
import { Optional } from '../../types';
import { IUser } from '../../db/models/User';

export default {
  createApartment: (source, args: { apartment: IApartment }, context: { user: IUser}): Promise<IApartmentDocument> => create(args.apartment, context.user),
  editApartment: (source, args: { id: string; apartment: Optional<IApartment>}, context: { user: IUser}): Promise<IApartmentDocument> => edit(args.id, args.apartment, context.user),
  removeApartment: (source, args: { id: string }, context: { user: IUser}): Promise<IApartmentDocument> => remove(args.id, context.user),
};
