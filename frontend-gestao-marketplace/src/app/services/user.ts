import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IAuthSucessResponse } from "../interfaces/auth-sucess-response";
import { ILoginSucessResponse } from "../interfaces/login-sucess-response";
import { environment } from "../../environments/environment.development";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private readonly _httpClient = inject(HttpClient);

	validateUser() {
		return this._httpClient.get<IAuthSucessResponse>(
			environment.apiUrl + "/protected",
		);
	}

	login(email: string, password: string) {
		const body = {
			email,
			password,
		};
		return this._httpClient.post<ILoginSucessResponse>(
			environment.apiUrl + "/users/login",
			body,
		);
	}
}
