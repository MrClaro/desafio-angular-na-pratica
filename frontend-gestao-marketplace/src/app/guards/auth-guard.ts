import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";
import { firstValueFrom } from "rxjs";

export const authGuard: CanActivateFn = async (router, state) => {
  const _userService = inject(UserService)
  const _userAuthService = inject(UserAuthService)
  const _router = inject(Router)

  // Não possui token no localstorage
  const HAS_TOKEN = _userAuthService.getUserToken();
  if (!HAS_TOKEN) {
    return _router.navigate(["/login"]);
  }

  try {
    // Tenta validar o token do backend
    await firstValueFrom(_userService.validateUser());


    // TODO: CRIAR UM GUARD PARA VALIDAR O /LOGIN SE POSSUI UM TOKEN VÁLIDO
    // Se o usuário está validado e a rota que ele está tentando acessar é a de login,
    // ele é redirecionado para a página de produtos.
    // if (state.url === "/login") {
    //   return _router.navigate(["/products"]);
    // }

    // Se o token é valido e a rota não é a de login, permite o acesso para a rota desejada.
    return true;
  } catch (error) {
    // Se o token não é válido, redireciona o usuário para a página de login.
    return _router.navigate(["/login"]);
  }
}
