import { TFacility } from './Facility.interface';
import { FacilityModel } from './Facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await FacilityModel.create(payload);
  return result;
};
export const FacilityServices = {
  createFacilityIntoDB,
};
