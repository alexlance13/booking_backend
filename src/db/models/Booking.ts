import mongoose from 'mongoose';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    sellerId: ID,
    buyerId: ID,
    apartmentsId: ID,
    dateStart: { type: String, requred: true },
    dateEnd: { type: String, requred: true },
  },
  { versionKey: false }
);

export default mongoose.model('Booking', schema);
