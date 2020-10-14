import mongoose from 'mongoose';

const ID = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 25 },
    description: { type: String, required: true, minlength: 3, maxlength: 800 },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    roomsCount: { type: Number, required: true },
    variant: { type: String, enum: ['RESTAURANT', 'CLUB', 'MUSEUM', 'CINEMA'] },
    quantity: { type: Number, required: true },
    seller: { type: ID, ref: 'User', autopopulate: true },
  },
  { versionKey: false }
);

schema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('Voucher', schema);
