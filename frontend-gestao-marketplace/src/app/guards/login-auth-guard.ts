import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserAuthService } from "../services/user-auth";
import { UserService } from "../services/user";
import { firstValueFrom } from "rxjs";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
	const _userAuthService = inject(UserAuthService);
	const _userService = inject(UserService);
	const _router = inject(Router);

	// Token Inexistente, permitir acesso ao login
	const HAS_TOKEN = _userAuthService.getUserToken();
	if (!HAS_TOKEN) return true;

	// Verifica se o token é válido
	try {
		await firstValueFrom(_userService.validateUser());
		// Token Válido, redirecionar para /products
		return _router.navigate(["/products"]);
	} catch (error) {
		// Token Inválido, permitir acesso ao Login
		return true;
	}
};
