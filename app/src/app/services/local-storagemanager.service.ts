import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStoragManagerService {
  constructor() {}

  DEFAULT_TOKEN_STORAGE_NAME = 'token';

  public tokenManagerAdd(resToken: any): any {
    if (localStorage.getItem(this.DEFAULT_TOKEN_STORAGE_NAME) === null) {
      localStorage.setItem(this.DEFAULT_TOKEN_STORAGE_NAME, resToken.token);
      return resToken;
    }
  }

  public getToken(): string | null {
    return localStorage.getItem(this.DEFAULT_TOKEN_STORAGE_NAME);
  }

  public tokenManagerRemove(): boolean {
    if (localStorage.getItem(this.DEFAULT_TOKEN_STORAGE_NAME) != null) {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }
}
