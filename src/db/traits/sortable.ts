import mongoose from 'mongoose';
import { EntityQuery } from '../../types';
import { SortType } from '../../types/enums';

function sortable(Schema: mongoose.Schema): void {
  Schema.statics.sortBy = function sortBy(query: EntityQuery, sort: string, value: SortType): EntityQuery {
    const schemaSorts = Schema.statics.getSorts ? Schema.statics.getSorts(query) : {};
    const sorts = {
      sortByPrice: (arg: string): EntityQuery => query.sort(`${arg === 'desc' ? '-' : ''}price`),
      ...schemaSorts,
    };
    return sorts[sort] && value ? sorts[sort](value || 'asc') : query;
  };
}

export default sortable;
