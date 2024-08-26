import axios, { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "./apiError";
import { IPost } from "interfaces/Post";
import { IUserPayload } from "interfaces/UserPayload";
import { IUserCreatedDto } from "interfaces/UserCreatedDto";

class ApiClient {
  apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  async getUserByEmail(email: string) {
    try {
      const response = await this.apiInstance.get("/users", { params: email });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error);
      } else {
        throw error;
      }
    }
  }

  async createUser(userData: IUserPayload): Promise<IUserCreatedDto> {
    try {
      const response = await this.apiInstance.post(
        "/users/new",
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

  async getPopularPosts(): Promise<IPost[]> {
    try {
      const response = await this.apiInstance.get("/posts");
      return response.data.data.posts[0];
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
