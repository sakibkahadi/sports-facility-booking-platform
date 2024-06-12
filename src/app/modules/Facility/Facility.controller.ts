/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { FacilityServices } from './Facility.service';
import sendResponse from '../../utils/sendResponse';

const createFacility = catchAsync(async (req, res, next) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});
const updateFacility = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});
export const FacilityControllers = {
  createFacility,
  updateFacility,
};
