import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TFacility } from './Facility.interface';
import { FacilityModel } from './Facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await FacilityModel.create(payload);
  return result;
};
const getAllFacilityFromDB = async () => {
  const result = await FacilityModel.find({ isDeleted: false });
  return result;
};
const updateFacilityFromDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const isFacilityExist = await FacilityModel.findById(id);
  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This faculty is not exists');
  }
  const result = await FacilityModel.findByIdAndUpdate(id, payload, {
    upsert: true,
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteFromDB = async (id: string) => {
  const isFacilityExist = await FacilityModel.findById(id);
  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This faculty is not exists');
  }
  const result = await FacilityModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  );
  return result;
};
export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  deleteFromDB,
  getAllFacilityFromDB,
};
