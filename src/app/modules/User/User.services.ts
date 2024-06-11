import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './User.interface';
import { UserModel } from './User.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ email: payload?.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const isPasswordMatched = isUserExist.password;
  if (isPasswordMatched !== payload?.password) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Password do not matched');
  }
  return isUserExist;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
