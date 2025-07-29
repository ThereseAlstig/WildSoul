export interface IUser {
    token: string;
    id?: number;
    email: string;
    username: string;
    password?: string; 
    role?: string;
  }