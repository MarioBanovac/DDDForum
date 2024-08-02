import axios, { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "./apiError";

interface IUserData {
  email: string;
  username: string;
  password: string;
}

interface ICreateSuccessDto {
  data: {
    email: string;
    username: string;
    id: number;
  };
  success?: boolean;
}

class ApiClient {
  apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: "http://localhost:3000/users",
    });
  }

  async getUserByEmail(email: string) {
    try {
      const response = await this.apiInstance.get("/", { params: email });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error);
      } else {
        throw error;
      }
    }
  }

  async createUser(userData: IUserData): Promise<ICreateSuccessDto> {
    try {
      const response = await this.apiInstance.post(
        "/new",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error);
      } else {
        throw error;
      }
    }
  }
}

const apiClient = new ApiClient();

export { apiClient };
