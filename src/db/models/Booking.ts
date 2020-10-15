import mongoose from 'mongoose';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    buyer: {
      type: ID,
      ref: 'User',
      autopopulate: true
    },
    apartment: {
      type: ID,
      ref: 'Apartment',
      autopopulate: true
    },
    dateStart: {
      type: String,
      requred: true
    },
    dateEnd: {
      type: String,
      requred: true
    },
  },
  { versionKey: false }
);

schema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('Booking', schema);
