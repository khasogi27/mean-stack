import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { LocalService } from './local.service';
import { Router } from '@angular/router';
import { IUser } from '../routes/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _localSvc = inject(LocalService);
  private _router = inject(Router);
  private _authSecretKey = 'Bearer Token';

  constructor() { }

  login(args: IUser) {
    this._http.post('http://localhost:3000/api/auth/login', args)
      .subscribe((resp: any) => {
        console.log(resp, '<<<accessToken>>>')
        const restUser = resp['accessToken'];
        this._localSvc.saveSessions(this._authSecretKey, JSON.stringify(restUser));
        this._router.navigateByUrl('dashboard');
      });
  }

  logout() {
    this._localSvc.removeSession(this._authSecretKey);
    this._router.navigateByUrl('login');
  }

  getToken() {
    return this._localSvc.getSession(this._authSecretKey);
  }
}
