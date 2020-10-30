import { IApartmentDocument } from '../../db/models/apartment';
import { getAll, getById } from '../../services/apartment.service';

export default {
  getApartmentById: (obj: any, args: { id: string }): Promise<IApartmentDocument> => getById(args.id),
  getAllApartments: (obj: any, args: any): Promise<IApartmentDocument[]> => getAll(args),
};
