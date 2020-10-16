import { IApartmentDocument } from '../../db/models/apartment';
import { getAll, getById } from '../../services/apartment.service';
import { ID } from '../../types';

export default {
  getApartmentById: (obj: any, args: {id: ID}): Promise<IApartmentDocument> => getById(args.id),
  getAllApartments: (): Promise<IApartmentDocument[]> => getAll(),
};
