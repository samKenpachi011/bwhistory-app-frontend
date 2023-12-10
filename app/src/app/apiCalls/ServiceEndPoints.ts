import { Observable } from 'rxjs';

export class ServiceEndPoints {
  constructor() {}

  public static readonly baseURL = 'http://localhost:8000';
  public static readonly apiBaseURL = `${this.baseURL}/api`;
  public static readonly registerUser = `${this.apiBaseURL}/user/create/`;
  public static readonly logInUser = `${this.apiBaseURL}/user/token/`;
  public static readonly currentUser = `${this.apiBaseURL}/user/profile/`;

  public static readonly createEthnicGroup = `${this.apiBaseURL}/ethnic_group/ethnic_groups/`;
  public static readonly getAllEthnicGroups = `${this.apiBaseURL}/ethnic_group/ethnic_groups/`;

}
