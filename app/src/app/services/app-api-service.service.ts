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

}
