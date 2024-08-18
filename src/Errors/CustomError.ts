class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "CustomError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
