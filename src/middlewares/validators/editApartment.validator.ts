import mongoose from 'mongoose';
import validate from '../../helpers/validation.helper';
import { MiddlewareFn, Optional } from '../../types';
import { IApartment } from '../../db/models/Apartment';

const editApartmentValidation: MiddlewareFn = (root, args: { apartment: Optional<IApartment>; id: string}, context, info, next) => {
  const rules = {
    _id: 'required|alpha_num',
    name: 'string|min:3|max:50',
    description: 'string|min:3|max:800',
    image: 'url',
    price: 'numeric|min:1',
    roomsCount: 'numeric|min:1|max:20',
  };
  const { apartment, id } = args;
  apartment._id = mongoose.Types.ObjectId(id);

  validate(rules, apartment);

  return next();
};

export default editApartmentValidation;
