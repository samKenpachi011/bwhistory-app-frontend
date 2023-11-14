import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { LocalStoragManagerService } from "../services/local-storagemanager.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(
    private router: Router,
    private storageService: LocalStoragManagerService,){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.storageService.getToken()!
    if (authToken !== null){

      console.log(`Auth token: ${authToken}`);
      req = req.clone({
        setHeaders: {
          Authorization: `token ${authToken}`,
          Accept: 'application/json',
        }
      });

    }

    return next.handle(req).pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 401){
      localStorage.clear();
      this.router.navigate(['login']);
    }

    return throwError(()=> new Error('Something went wrong: please try again '));
  }



}
