import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LocalService } from './local.service';
import { Router } from '@angular/router';
import { IUserLogin } from '../routes/login/login.component';
import { IUserRegister } from '../routes/register/register.component';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';

interface ResultPostResp extends IUserRegister { 
  accessToken: string, 
  userId: string,
  errors?: IUserRegister
};

export interface PostResponse {
  message: string,
  result?: ResultPostResp,
  code: 0 | 1
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _localSvc = inject(LocalService);
  private _router = inject(Router);
  private _authSecretKey = 'Bearer Token';

  constructor() { }

  // register(args: IUserRegister): void {
  //   this._http.post<PostResponse>(environment.api_service + '/api/auth/register', args)
  //     .subscribe((resp: PostResponse) => {
  //       if (resp.code != 0) {
  //         console.log(resp.message);
  //         return;
  //       }
  //       const getResult = resp.result;
  //       console.log(getResult?.userId, '<<<userId>>>');
  //       this._router.navigateByUrl('login');
  //     });
  // }

  register(args: IUserRegister): Observable<PostResponse> {
    return this._http.post<PostResponse>(environment.api_service + '/api/auth/register', args)
      .pipe(
        map((resp: PostResponse) => {
          if (resp.code != 0) {
            console.log(resp.message, '<<<error register>>>');
          } else {
            const getResult = resp.result;
            console.log(getResult?.userId, '<<<userId>>>');
            this._router.navigateByUrl('login');
          }
          return resp;
        }));
  }

  // login(args: IUserLogin): void {
  //   this._http.post<PostResponse>(environment.api_service + '/api/auth/login', args)
  //     .subscribe((resp: PostResponse) => {
  //       if (resp.code != 0) {
  //         console.log(resp.message);
  //         return;
  //       }
  //       const getResult = resp.result;
  //       console.log(getResult?.accessToken, '<<<accessToken>>>');
  //       this._localSvc.saveSessions(this._authSecretKey, JSON.stringify(getResult?.accessToken));
  //       this._router.navigateByUrl('dashboard');
  //     });
  //   }

  login(args: IUserLogin): Observable<PostResponse> {
    return this._http.post<any>(environment.api_service + '/api/auth/login', args)
      .pipe(
        map((resp: PostResponse) => {
          if (resp.code != 0) {
            console.log(resp.message, '<<<error login>>>');
          } else {
            const getResult = resp.result;
            console.log(getResult?.accessToken, '<<<accessToken>>>');
            this._localSvc.saveSessions(this._authSecretKey, JSON.stringify(getResult?.accessToken));
            this._router.navigateByUrl('dashboard');
          }
          return resp;
      }));
  }

  logout() {
    this._localSvc.removeSession(this._authSecretKey);
    this._router.navigateByUrl('login');
  }

  getToken() {
    return this._localSvc.getSession(this._authSecretKey);
  }
}
