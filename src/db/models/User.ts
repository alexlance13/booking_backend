import mongoose, { Document, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import pwd from 'password-hash';
import { config } from 'node-config-ts';
import * as types from '../../types';

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
      enum: Object.keys(types.Role),
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
  if ((this as IUserDocument).password && this.isModified('password')) {
    (this as IUserDocument).password = pwd.generate((this as IUserDocument).password);
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

schema.methods.jwtSign = async function jwtSign(): Promise<string> {
  const obj = this.toObject();
  return jwt.sign(obj, config.SECRET_KEY);
};

schema.statics.jwtVerify = async function jwtVerify(token: string): Promise<IUserDocument> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id } = jwt.verify(token, config.SECRET_KEY) as IUserDocument;
  return this.findById(_id);
};

export interface IUser {
  _id: types.ID | any;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
}

export interface IUserDocument extends IUser, Document{
  jwtSign(): Promise<string>;
  verifyPassword(plainPassword: any): Promise<boolean>;
}
export interface IUserModel extends Model<IUserDocument>{
  jwtVerify(token: string): IUserDocument;
}
export default mongoose.model<IUserDocument, IUserModel>('User', schema);
