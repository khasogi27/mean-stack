import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authSvc = inject(AuthService);
  const _router = inject(Router);

  if (_authSvc.getToken() == null) {
    _router.navigateByUrl('login');
    return false;
  } else {
    return true;
  }
};
