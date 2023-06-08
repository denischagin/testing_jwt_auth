import { AxiosResponse } from "axios";
import { $api } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export class AuthService {
    static registration (username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/registration", {username, password})
    }

    static login (email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/login", {email, password})
    }

    static logout (): Promise<void> {
        return $api.post("/logout")
    }
    
    static refresh (): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>("./refresh")
    }
}