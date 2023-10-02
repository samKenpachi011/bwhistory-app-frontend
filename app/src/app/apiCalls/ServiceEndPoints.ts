import { Observable } from 'rxjs';

export class ServiceEndPoints {
  constructor() {}

  public static readonly baseURL = 'http://localhost:8000';
  public static readonly apiBaseURL = `${this.baseURL}/api`;
  public static readonly registerUser = `${this.apiBaseURL}/user/create/`;
}
