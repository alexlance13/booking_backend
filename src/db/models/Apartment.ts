import mongoose from 'mongoose';
const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 25 },
    description: { type: String, required: true, minlength: 3, maxlength: 800 },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    roomsCount: { type: Number, required: true },
    sellerId: ID,
  },
  { versionKey: false }
);

export default mongoose.model('Apartment', schema);
