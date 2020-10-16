import validate from '../../helpers/validation';
import { MiddlewareFn } from '../../types';
import { IApartment } from '../../db/models/Apartment';

const createApartmentValidation: MiddlewareFn = async (root, args: {apartment: IApartment}, context, info, next) => {
  const rules = {
    name: 'required|string|min:3|max:25',
    description: 'required|string|min:3|max:800',
    image: 'required|url',
    price: 'required|numeric|min:1',
    roomsCount: 'required|numeric|min:1|max:20',
    seller: 'required|string',
  };
  const { apartment } = args;

  validate(rules, apartment);

  return next();
};

export default createApartmentValidation;
