import axios from "axios";
import { AUTH_ENDPOINT } from "../shared/constants/api";
import { User } from "../shared/models";
import { RegisterUserDto, LoginUserDto } from "../shared/types/api";

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
