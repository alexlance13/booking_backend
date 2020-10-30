import mongoose from 'mongoose';

function filterable(Schema: mongoose.Schema): any {
  // eslint-disable-next-line no-param-reassign
  Schema.statics.filterBy = async function filterBy(query, filter, value): Promise<any> {
    const schemaFilters = Schema.statics.getFilters ? Schema.statics.getFilters(query) : {};
    const filters = {
      priceFrom: (arg: string): any => query.where('price').gte(+arg),
      priceTo: (arg: string): any => query.where('price').lte(+arg),
      ...schemaFilters,
    };
    return filters[filter] && value ? filters[filter](value) : query;
  };
}

export default filterable;
