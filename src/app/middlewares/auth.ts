import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/User/User.model';
import { TUserRole } from '../modules/User/User.interface';

export const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const getAuthorizationHeaders = req.headers.authorization;
    if (
      !getAuthorizationHeaders ||
      !getAuthorizationHeaders.startsWith('Bearer ')
    ) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }
    // Remove Bearer
    const token = getAuthorizationHeaders.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      const { role, userId } = decoded;

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'You have no access to this route',
        });
      }

      if (requireRoles && !requireRoles.includes(role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'You have no access to this route',
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }
  });
};
