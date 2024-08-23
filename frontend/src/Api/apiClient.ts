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


interface ICommentDto {
  id: number,
  memberId: number,
  parentCommentId: null | number
  postId: number
  text: string
}

interface IMemberDto {
  id: number,
  userId: number,
  user: {
    username: string
  }
}

interface IVoteDto {
  id: number,
  memberId: number,
  postId: number,
  voteType: 'Upvote' | 'DownVote'
}

interface IPostDto {
  comments: Array<ICommentDto>,
  content: string,
  dateCreated: string,
  id: number,
  memberId: number,
  memberPostedBy: IMemberDto,
  postType: string,
  title: string
  votes: Array<IVoteDto>
}

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

  async createUser(userData: IUserData): Promise<ICreateSuccessDto> {
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
  
  async getPopularPosts(): Promise<IPostDto> {
    try {
      const response = await this.apiInstance.get('/posts')
      return response.data.data.posts[0]
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
