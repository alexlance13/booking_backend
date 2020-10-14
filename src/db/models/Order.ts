import mongoose from 'mongoose';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    sellerId: ID,
    buyerId: ID,
    vaucherId: ID,
    quanity: { type: Number, requred: true },
  },
  { versionKey: false }
);

export default mongoose.model('Order', schema);
