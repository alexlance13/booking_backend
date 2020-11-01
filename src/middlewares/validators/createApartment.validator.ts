import { middlewareFn } from 'graphql-add-middleware';
import validate from '../../helpers/validation.helper';
import { IApartment } from '../../db/models/Apartment';

const createApartmentValidation: middlewareFn = async (root, args: { apartment: IApartment }, context, info, next) => {
  const rules = {
    name: 'required|string|min:3|max:50',
    description: 'required|string|min:3|max:800',
    image: 'required|url',
    price: 'required|numeric|min:1',
    roomsCount: 'required|numeric|min:1|max:20',
  };

  validate(rules, args.apartment);

  return next();
};

export default createApartmentValidation;
