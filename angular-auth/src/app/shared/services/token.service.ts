import { Injectable, inject } from '@angular/core';
import { sessionStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _storageSvc = inject(sessionStorageService);
  private _authSecretKey = 'Bearer Token';

  getTokenExpired(): boolean {
    if (!this.getToken()) return true;
    const expiry = (JSON.parse(atob(this.getToken().split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  setToken(token: string): void {
    this._storageSvc.saveSessions(this._authSecretKey, token);
  }

  removeToken(): void {
    this._storageSvc.removeSession(this._authSecretKey);
  }

  getToken = (): string => this._storageSvc.getSession(this._authSecretKey)!;
}
