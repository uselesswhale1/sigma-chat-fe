export type UpdateUserDto = {
  name?: string;
  bio?: string;
  photoUrl?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type UpdateAuthDto = {
  name?: string;
  bio?: string;
  photoUrl?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type RegisterUserDto = {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};
