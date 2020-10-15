import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25
    },
    last_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25
    },
    email: {
      type: String,
      required: true,
      inlength: 7,
      maxlength: 25
    },
    role: {
      type: String,
      enum: ['BUYER', 'SELLER']
    },
  },
  { versionKey: false }
);

export default mongoose.model('User', schema);
