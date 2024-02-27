import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, of, throwError } from "rxjs";
import { Router } from "@angular/router";

enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export const httpErrorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn)  => {
  const _authSvc = inject(AuthService);
  const _router = inject(Router);
  const token = _authSvc.getToken();

  if (token) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(modifiedReq);
  }

  return next(req).pipe(catchError((error) => {
    const errorPages = [STATUS.UNAUTHORIZED, STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];
    const resp: HttpErrorResponse = error as unknown as HttpErrorResponse;
  
    if (error.status == STATUS.UNAUTHORIZED) {
      _router.navigateByUrl('login');
    } else if (error.status === STATUS.FORBIDDEN) {
      _router.navigateByUrl('/');
    } else if (errorPages.includes(error.status)) {
      _router.navigateByUrl('login/' + error.status, { skipLocationChange: true });
    } else if (error instanceof HttpErrorResponse) {
      console.log(error.error.msg || `${error.status} ${error.statusText}`);
    }
  
    let body = {
      code: resp.error.code,
      type: resp.error.type,
      message: resp.error.message,
      result: resp.error.result
    };
  
    return of(new HttpResponse({ body }));
  }));
}