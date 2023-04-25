export default interface ILoginResponse {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  access_token: string;
}
