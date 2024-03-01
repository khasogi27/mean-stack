import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, of } from "rxjs";
import { Router } from "@angular/router";
import { TokenService } from "../shared/services/token.service";

enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export const httpErrorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn)  => {
  const _router: Router = inject(Router);
  const _tokenSvc: TokenService = inject(TokenService);
  const token: string = _tokenSvc.getToken();
  const tokenExp: boolean = _tokenSvc.getTokenExpired();

  if (token && !tokenExp) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${JSON.parse(token)}`)
    });
    return next(modifiedReq);
  }

  return next(req).pipe(catchError((error) => {
    const errorPages: STATUS[] = [STATUS.UNAUTHORIZED, STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];
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
      message: resp.error.message,
      result: resp.error.result
    };
  
    return of(new HttpResponse({ body }));
  }));
}