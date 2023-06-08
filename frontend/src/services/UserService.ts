import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IUser } from './../models/IUser';

export class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>  {
        return $api.get("/users")
    }
}