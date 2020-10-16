// @ts-nocheck
import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import pwd from 'password-hash';
import { config } from 'node-config-ts';
import { Role } from '../../types';

const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      inlength: 7,
      maxlength: 25,
    },
    role: {
      type: String,
      enum: Object.keys(Role),
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 32,
    },
  },
  { versionKey: false },
);

schema.pre('save', async function beforeSave(next) {
  if (this.password && this.isModified('password')) {
    this.password = pwd.generate(this.password);
  }
  await next();
});

schema.methods.toJSON = function toJSON(): IUserDocument {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

schema.methods.verifyPassword = async function verifyPassword(plainPassword): Promise<boolean> {
  return pwd.verify(plainPassword, this.password);
};

schema.methods.jwtSign = async function jwtSign(): Promise<String> {
  const obj = this.toObject();
  return jwt.sign(obj, config.SECRET_KEY);
};

schema.statics.jwtVerify = async function jwtVerify(token: string): Promise<IUserDocument> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id } = jwt.verify(token, config.SECRET_KEY);
  return this.findById(_id);
};

export interface IUser {
  first_name: String;
  last_name: String;
  email: String;
  role: String;
  password: String;
}

export interface IUserDocument extends Document{
  jwtSign: () => Promise<String>;
  jwtVerify: (token: string) => IUserDocument;
  verifyPassword: (plainPassword: any) => Promise<boolean>;
}
export default mongoose.model<IUserDocument>('User', schema);
