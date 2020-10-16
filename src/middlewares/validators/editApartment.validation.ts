import validate from '../../helpers/validation';
import { MiddlewareFn, Optional } from '../../types';
import { IApartment } from '../../db/models/Apartment';

const editApartmentValidation: MiddlewareFn = (root, args: {apartment: Optional<IApartment>}, context, info, next) => {
  const rules = {
    _id: 'required|alpha_num',
    name: 'string|min:3|max:25',
    description: 'string|min:3|max:800',
    image: 'url',
    price: 'numeric|min:1',
    roomsCount: 'numeric|min:1|max:20',
    seller: 'string',
  };
  const { apartment } = args;

  validate(rules, apartment);

  return next();
};

export default editApartmentValidation;
