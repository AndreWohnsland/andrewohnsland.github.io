import { Document, Model } from 'mongoose';

export interface IUser {
  username: String;
  password: String;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IUserModel extends IUser, Document {}

export interface IUserDocument extends Model<IUserModel> {
  login(username: string, password: string): Promise<IUserModel>;
}
