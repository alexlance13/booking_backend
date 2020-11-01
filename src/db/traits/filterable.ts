import mongoose from 'mongoose';
import { EntityQuery } from '../../types';

function filterable(Schema: mongoose.Schema): void {
  Schema.statics.filterBy = function filterBy(query: EntityQuery, filter: string, value: string): EntityQuery {
    const schemaFilters = Schema.statics.getFilters ? Schema.statics.getFilters(query) : {};
    const filters = {
      priceFrom: (arg: string): EntityQuery => query.where('price').gte(+arg),
      priceTo: (arg: string): EntityQuery => query.where('price').lte(+arg),
      ...schemaFilters,
    };
    return filters[filter] && value ? filters[filter](value) : query;
  };
}

export default filterable;
