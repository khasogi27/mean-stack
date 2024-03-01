import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getData = (key: string): string | null => localStorage.getItem(key);

  saveData(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  deleteData(): void {
    localStorage.clear();
  }
}

@Injectable({
  providedIn: 'root'
})
export class sessionStorageService {

  getSession = (key: string): string | null => sessionStorage.getItem(key);

  saveSessions(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  deleteSession(): void {
    sessionStorage.clear();
  }
}
