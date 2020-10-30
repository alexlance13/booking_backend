import validate from '../../helpers/validation.helper';
import {
  MiddlewareFn, ISearchParams, Variant, SortType,
} from '../../types';

const getAllApartmentsOrVouchers: MiddlewareFn = async (root, args: { searchParams?: ISearchParams; admin: boolean }, context, info, next) => {
  const rules = {
    priceFrom: 'numeric|between:0,9999',
    priceTo: `numeric|between:${args?.searchParams?.priceFrom || 0},9999`,
    variant: `in:${Object.keys(Variant)}`,
    rooms: 'numeric|between:1,20',
    startDate: `date${args?.admin ? '' : '|notPast'}`,
    endDate: `date|after_or_equal:startDate${args?.admin ? '|notFuture' : ''}`,
    sortByPrice: `in:${Object.keys(SortType)}`,
    sortByRooms: `in:${Object.keys(SortType)}`,
  };

  validate(rules, args?.searchParams);

  return next();
};

export default getAllApartmentsOrVouchers;
