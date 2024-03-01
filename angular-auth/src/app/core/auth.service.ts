import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable, map, of } from 'rxjs';
import { sessionStorageService } from '../shared/services/storage.service';
import { TokenService } from '../shared/services/token.service';
import { IPostResponse, IProfile, IUser } from '../shared/interfaces/response';

const Guest: IProfile = {
  userId: '',
  fullName: 'unknown', 
  email: 'unknown', 
  role: 'user'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _storageSvc: sessionStorageService = inject(sessionStorageService);
  private _tokenSvc: TokenService  = inject(TokenService);
  private _router: Router = inject(Router);

  private _registerUrl: string = '/api/auth/register';
  private _loginUrl: string = '/api/auth/login';
  private _userProfileUrl: string = '/api/account/profile';
  
  private _authIdKey: string = 'User Id';

  public guest: IProfile = Guest;

  register(args: IUser): Observable<IPostResponse> {
    return this._http.post<IPostResponse>(environment.api_service + this._registerUrl, args)
      .pipe(
        map((resp: IPostResponse) => {
          if (resp.code != 0) {
            console.log(resp.message, '<<<error register>>>');
          } else {
            const getResult = resp.result;
            console.log(getResult, '<<<userId>>>');

            this._router.navigateByUrl('login');
          }
          return resp;
        }));
  }

  login(args: IUser): Observable<IPostResponse> {
    return this._http.post<any>(environment.api_service + this._loginUrl, args)
      .pipe(
        map((resp: IPostResponse) => {
          if (resp.code != 0) {
            console.log(resp.message, '<<<error login>>>');
          } else {
            const getResult = resp.result.datas;
            console.log(getResult?.accessToken, '<<<accessToken>>>');
            this._setUserId(JSON.stringify(getResult?.userId));
            this._tokenSvc.setToken(JSON.stringify(getResult?.accessToken));

            this._router.navigateByUrl('dashboard');
          }
          return resp;
      }));
  }

  userProfile(): Observable<IProfile> {
    if (!this._getUserId()) return of(this.guest);

    return this._http.get(environment.api_service + this._userProfileUrl)
      .pipe(
        map((resp: any) => {
          if (resp.code != 0) {
            console.log(resp.message, '<<< error user profile >>>');
          }
          const dataUser = { ...resp.result.datas };
          return dataUser;
        })
      );
  }

  logout(): void {
    this._removeUserId();
    this._tokenSvc.removeToken();
    this._router.navigateByUrl('login');
  }

  private _setUserId(token: string): void {
    this._storageSvc.saveSessions(this._authIdKey, token);
  }

  private _removeUserId(): void {
    this._storageSvc.removeSession(this._authIdKey);
  }

  private _getUserId = (): string => this._storageSvc.getSession(this._authIdKey)!;
}
