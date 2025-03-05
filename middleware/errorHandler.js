import { errorCodes } from "../constants.js";

export const errorHandler = (err, req, res, next) => {
  console.log("respose" , res.statusCode)
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
console.log("StatusCode", statusCode)
  switch (statusCode) {
    case errorCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        msg: err.message,
        stackTrace: err.stack,
      });

    case errorCodes.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        msg: err.message,
        stackTrace: err.stack,
      });

    case errorCodes.FORBIDDEN:
      res.json({
        title: "Forbidden",
        msg: err.message,
        stackTrace: err.stack,
      });

    case errorCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        msg: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("No error ");
      res.send("ok")
  }
};
