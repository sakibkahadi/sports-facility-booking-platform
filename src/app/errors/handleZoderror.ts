import { ZodError, ZodIssue } from 'zod';

import config from '../config';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  };
};

export default handleZodError;
