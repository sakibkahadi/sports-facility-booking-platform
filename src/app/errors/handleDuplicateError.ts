/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorMessage,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorMessages: TErrorMessage = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Key',
    errorMessages: errorMessages,
  };
};

export default handleDuplicateError;
