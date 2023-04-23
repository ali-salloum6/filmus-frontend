import ILoginResponse from "./LoginResponse";

export default interface IUpdatedUser extends ILoginResponse {
  password: string;
}
