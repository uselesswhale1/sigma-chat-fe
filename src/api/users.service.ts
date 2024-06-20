import axios from "axios";
import { ENDPOINT } from "../shared/constants";
import { User } from "../shared/models";

const USERS_ENDPOINT = ENDPOINT + "/users";

class UsersService {
  async getUsers(): Promise<User[]> {
    const { data } = await axios.get(USERS_ENDPOINT);

    return data;
  }
}

export const usersService = new UsersService();
