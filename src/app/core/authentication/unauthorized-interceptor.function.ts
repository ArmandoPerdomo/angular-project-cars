import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          if(error.status === 401 && !this.router.url.includes('auth')){
            this.authService.logout();
          }

          return throwError(error);
        }
      )
    )
  }
}
