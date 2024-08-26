export interface IUserCreatedDto {
  data: {
    email: string;
    username: string;
    id: number;
  };
  success?: boolean;
}
