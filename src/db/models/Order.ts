import mongoose from 'mongoose';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    buyer: {
      type: ID,
      ref: 'User',
      autopopulate: true,
    },
    voucher: {
      type: ID,
      ref: 'Voucher',
      autopopulate: true,
    },
    quantity: {
      type: Number,
      requred: true,
    },
  },
  { versionKey: false },
);

schema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('Order', schema);
