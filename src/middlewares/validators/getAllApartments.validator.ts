import validate from '../../helpers/validation.helper';
import {
  MiddlewareFn, ISearchParams, Variant, SortType,
} from '../../types';

const getAllApartments: MiddlewareFn = async (root, args: { searchParams?: ISearchParams }, context, info, next) => {
  console.log(args);
  const rules = {
    priceFrom: 'numeric|between:0,9999',
    priceTo: `numeric|between:${args?.searchParams?.priceFrom || 0},9999`,
    variant: `in:${Object.keys(Variant)}`,
    rooms: 'numeric|between:1,20',
    // startDate: 'date|after_or_equal|notPast',
    // endDate: 'date|after_or_equal:startDate',
    sortByPrice: `in:${Object.keys(SortType)}`,
    // availableDates: '', todo
    sortByRooms: `in:${Object.keys(SortType)}`,
  };

  validate(rules, args?.searchParams);

  return next();
};

export default getAllApartments;
