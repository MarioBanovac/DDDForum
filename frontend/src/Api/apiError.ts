import { AxiosError } from "axios";

export class ApiError extends Error {
  error: AxiosError;
  code: number | undefined;
  data: any;

  constructor(error: AxiosError) {
    super(error.message);
    this.error = error;
    this.data = error.response?.data;
    this.code = error.response?.status;
  }
}
