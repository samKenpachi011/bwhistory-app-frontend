import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ServiceEndPoints } from '../apiCalls/ServiceEndPoints';
import { LocalStoragManagerService } from './local-storagemanager.service';

@Injectable({
  providedIn: 'root',
})
export class AppApiService {
  constructor(
    private http: HttpClient,
    private storageManager: LocalStoragManagerService
  ) {}

  registerUser(data: any){
    return this.http.post(ServiceEndPoints.registerUser, data);
  }

  attemptLogIn(data: any){
    return this.http.post(
      ServiceEndPoints.logInUser,
      data).pipe(map(response => {
        if (this.storageManager.tokenManagerRemove() === false) {
          this.storageManager.tokenManagerAdd(response);
        }
      }));
  }

  isUserStaff(): Observable<any>{
    return this.http.get(ServiceEndPoints.currentUser).pipe(
      map((response:any) => {return response['is_staff'] === true})

      );
  }

  //ethnic group
  createEthnicGroup(data: any){
    console.log(data)
    return this.http.post(ServiceEndPoints.createEthnicGroup, data);

  }

  //get groups
  //TODO: to implement type of class group
  getAllEthnicGroups(): Observable<any>{
    return this.http.get(ServiceEndPoints.getAllEthnicGroups).pipe(
      map((response:any) => {return response}));
  }

}
