import { IApartmentDocument } from '../../db/models/Apartment';
import { getAll, getById } from '../../services/apartment.service';
import { ApartmentQuery, ISearchParams } from '../../types';

export default {
  getApartmentById: (source, args: { id: string }): Promise<IApartmentDocument> => getById(args.id),
  getAllApartments: (source, args: { searchParams: ISearchParams; admin?: boolean }): Promise<ApartmentQuery> => getAll(args),
};
