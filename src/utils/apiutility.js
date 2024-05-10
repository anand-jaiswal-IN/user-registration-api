class ApiResponse {
  constructor(statusCode, message = "success", data = "null") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}
class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.msg = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
export {
    ApiError, ApiResponse
}