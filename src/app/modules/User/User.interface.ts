/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './User.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
};
export type TLoginUser = {
  email: string;
  password: string;
};
export type TUserRole = keyof typeof USER_ROLE;

export interface UserStatic extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
