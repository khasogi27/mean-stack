import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../shared/services/token.service';

export const authGuard: CanActivateFn = (route, state): boolean => {
  const _router: Router = inject(Router);
  const _tokenSvc: TokenService = inject(TokenService);
  
  const token: String = _tokenSvc.getToken();
  const tokenExp: boolean = _tokenSvc.getTokenExpired();

  if (token && !tokenExp) {
    return true;
  } else {
    _router.navigateByUrl('login');
    return false;
  }
};
