import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AUTH_SERVICE, AuthModule, PROTECTED_FALLBACK_PAGE_URI, PUBLIC_FALLBACK_PAGE_URI} from "ngx-auth";
import {AuthenticationService} from './authentication.service';
import {UnauthorizedInterceptor} from './unauthorized-interceptor.function';


@NgModule({
  declarations: [],
  imports: [AuthModule],
  providers: [
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/private' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/public/login' },
    { provide: AUTH_SERVICE, useClass: AuthenticationService },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
  ]
})
export class AuthenticationModule { }
