import axios from "axios";
import { USERS_ENDPOINT } from "../shared/constants";
import { User } from "../shared/models";

class UsersService {
  async getUsers(): Promise<User[]> {
    return (await axios.get(USERS_ENDPOINT)).data;
  }
}

export const usersService = new UsersService();
