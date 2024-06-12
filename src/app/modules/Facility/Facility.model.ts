import { Schema, model } from 'mongoose';
import { TFacility } from './Facility.interface';

const facilitySchema = new Schema<TFacility>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform: (doc, response) => {
        delete response.__v;
        return response;
      },
    },
  },
);

export const FacilityModel = model<TFacility>('Facility', facilitySchema);
