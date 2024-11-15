import { ErrorRequestHandler } from "express";
// import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";

  let errorMessages: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    // statusCode = 400;
    // message = "ZodError";
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSources;
    // console.log(simplifiedError);
  } else if (err?.name === "ValidationError") {
    // console.log("Mongoose Validation Error");
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSources;
    // console.log(simplifiedError);
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSources;
    // console.log(simplifiedError);
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    // eslint-disable-next-line no-unused-expressions
    errorMessages;
    // console.log(simplifiedError);
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  if (statusCode === 401 || statusCode === 403) {
    return res.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      message,
    });
  } else {
    return res.status(statusCode).json({
      success: false,
      message,
      // error: err.message,
      errorMessages,
      // error: err,
      stack: config.NODE_ENV === "development" ? err?.stack : null,
    });
  }
};

export default globalErrorHandler;
