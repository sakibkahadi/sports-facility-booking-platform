import { ZodError, ZodIssue } from 'zod';

import config from '../config';
import {
  TErrorMessage,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessages: TErrorMessage = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errorMessages,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  };
};

export default handleZodError;
