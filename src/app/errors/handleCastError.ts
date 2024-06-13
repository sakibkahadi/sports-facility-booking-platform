import mongoose from 'mongoose';
import {
  TErrorMessage,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorMessage = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorMessages: errorMessages,
  };
};

export default handleCastError;
