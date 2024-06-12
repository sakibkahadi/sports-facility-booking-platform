import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/User/User.model';
import { TUserRole } from '../modules/User/User.interface';

export const auth = (requireRoles: TUserRole) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userEmail } = decoded;

    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    if (requireRoles && !requireRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    next();
  });
};
