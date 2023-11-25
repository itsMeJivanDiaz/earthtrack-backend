export interface AuthPayloadModel {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}
