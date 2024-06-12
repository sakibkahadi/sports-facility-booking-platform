import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './User.interface';
import { UserModel } from './User.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload?.password,
    isUserExist?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Password do not matched');
  }

  const jwtPayload = {
    userId: isUserExist?._id,
    role: isUserExist?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_expires_id,
  });

  return { accessToken, isUserExist };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
