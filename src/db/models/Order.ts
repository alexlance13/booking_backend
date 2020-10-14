import mongoose from 'mongoose';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    seller: { type: ID, ref: 'User', autopopulate: true },
    buyer: { type: ID, ref: 'User', autopopulate: true },
    vaucher: { type: ID, ref: 'Vaucher', autopopulate: true },
    quanity: { type: Number, requred: true },
  },
  { versionKey: false }
);

schema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('Order', schema);
