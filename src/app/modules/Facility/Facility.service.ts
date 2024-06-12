import { TFacility } from './Facility.interface';
import { FacilityModel } from './Facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await FacilityModel.create(payload);
  return result;
};
const getAllFacilityFromDB = async () => {
  const result = await FacilityModel.find();
  return result;
};
const updateFacilityFromDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await FacilityModel.findByIdAndUpdate(id, payload, {
    upsert: true,
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteFromDB = async (id: string) => {
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
