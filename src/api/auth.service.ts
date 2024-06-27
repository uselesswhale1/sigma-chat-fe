import axios from "axios";
import { ENDPOINT } from "../shared/constants/api";
import { User } from "../shared/models";

const AUTH_ENDPOINT = ENDPOINT + "/auth";

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

class AuthService {
  async register(registerUserDto: RegisterUserDto): Promise<User | null> {
    return await axios.post(AUTH_ENDPOINT + "/register", {
      ...registerUserDto,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    return await axios.post(AUTH_ENDPOINT + "/login", {
      ...loginUserDto,
    });
  }

  async profile(token: string): Promise<User | null> {
    return await axios.get(AUTH_ENDPOINT + "/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}

export const authService = new AuthService();
