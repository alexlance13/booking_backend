import { middlewareFn } from 'graphql-add-middleware';
import validate from '../../helpers/validation.helper';
import { ISearchParams } from '../../types';
import { SortType, Variant } from '../../types/enums';

const getAllApartmentsOrVouchers: middlewareFn = async (
  root,
  args: { searchParams?: ISearchParams; admin: boolean },
  context,
  info,
  next
) => {
  const rules = {
    priceFrom: 'numeric|between:0,9999',
    priceTo: `numeric|between:${args?.searchParams?.priceFrom || 0},9999`,
    variant: `in:${Object.keys(Variant)}`,
    roomsCount: 'numeric|between:1,20',
    startDate: `date${args?.admin ? '' : '|notPast'}`,
    endDate: `date|after_or_equal:startDate${args?.admin ? '|notFuture' : ''}`,
    sortByPrice: `in:${Object.keys(SortType)}`,
    sortByRooms: `in:${Object.keys(SortType)}`,
  };

  validate(rules, args.searchParams);

  return next();
};

export default getAllApartmentsOrVouchers;
