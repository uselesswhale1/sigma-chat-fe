export type UpdateUserDto = {
  name?: string;
  bio?: string;
  photoUrl?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export enum ROUTES {
  SIGN_UP = "/signup",
  SIGN_IN = "/signin",
}
