export interface ILogin {
  api: string;
  user: {
    id: string;
    email: string;
    name: string;
    password: string;
  };
}

export interface ILoginStore {
  data?: ILogin;
  loading: boolean;
  error: boolean;
  token?: string;
  refresh_token?: string;
  uid?: string;
}
