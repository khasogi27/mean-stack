import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  // saveData(key: string, value: any) {
  //   localStorage.setItem(key, value);
  // }

  // getData(key: string) {
  //   return localStorage.getItem(key);
  // }

  // removeData(key: string) {
  //   localStorage.removeItem(key);
  // }

  // deleteData() {
  //   localStorage.clear();
  // }

  saveSessions(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  getSession(key: string) {
    return sessionStorage.getItem(key);
  }

  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }
}
