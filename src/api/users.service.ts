import axios from "axios";
import { ENDPOINT } from "../shared/constants";
import { User } from "../shared/models";

const USERS_ENDPOINT = ENDPOINT + "/users";

class UsersService {
  async getUsers(): Promise<User[]> {
    try {
      const { data } = await axios.get(USERS_ENDPOINT);

      return data;
    } catch (error) {
      console.log("catch", error);

      throw error;
    }
  }
}

export const usersService = new UsersService();

// import { UpdateUserDto } from "../shared/types";
// async update(updateUserDto: UpdateUserDto): Promise<User> {
//   const { data } = await axios.get(USERS_ENDPOINT);
//   return data;
// }
