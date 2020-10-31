import { IApartmentDocument } from '../../db/models/Apartment';
import { getAll, getById } from '../../services/apartment.service';
import { ApartmentQuery, ISearchParams } from '../../types';

export default {
  getApartmentById: (obj: any, args: { id: string }): Promise<IApartmentDocument> => getById(args.id),
  getAllApartments: (obj: any, args: {searchParams: ISearchParams; admin?: boolean}): Promise<ApartmentQuery> => getAll(args),
};
