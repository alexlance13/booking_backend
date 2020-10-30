import mongoose from 'mongoose';

function sortable(Schema: mongoose.Schema): any {
  // eslint-disable-next-line no-param-reassign
  Schema.statics.sortBy = function sortBy(query, sort, value): any {
    const schemaSorts = Schema.statics.getSorts ? Schema.statics.getSorts(query) : {};
    const sorts = {
      sortByPrice: (arg: string): any => query.sort(`${arg === 'desc' ? '-' : ''}price`),
      ...schemaSorts,
    };
    return sorts[sort] && value ? sorts[sort](value || 'asc') : query;
  };
}

export default sortable;
