import { create, edit, remove } from '../../services/apartment.service';
import { IApartment, IApartmentDocument } from '../../db/models/Apartment';
import { Optional } from '../../types';
import { IUser } from '../../db/models/user';

export default {
  createApartment: (obj: any, args: {apartment: IApartment}, context: {user: IUser}): Promise<IApartmentDocument> => create(args.apartment, context.user),
  editApartment: (obj: any, args: {id: string; apartment: Optional<IApartment>}, context: {user: IUser}): Promise<IApartmentDocument> => edit(args.id, args.apartment, context),
  removeApartment: (obj: any, args: {id: string}, context: {user: IUser}): Promise<IApartmentDocument> => remove(args.id, context),
};
