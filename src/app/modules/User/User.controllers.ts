/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './User.services';
import config from '../../config';

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.loginUser(req.body);
  const { accessToken, isUserExist } = result;
  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    token: 'JWT_TOKEN',
    data: isUserExist,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
