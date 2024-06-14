/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorMessage,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorMessages: TErrorMessage = [
    {
      path: '',
      message: err.errmsg,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: err.errmsg,
    errorMessages: errorMessages,
  };
};

export default handleDuplicateError;
