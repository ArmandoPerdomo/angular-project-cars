import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {plainToClass} from "class-transformer";
import * as moment from "moment";
import {AuthService} from "ngx-auth";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {UserSession, UserSessionDef} from "./models/user-session.model";

interface LoginResponse{
  accessToken: string;
  expiresIn: number;
  user: UserSessionDef;
}

@Injectable()
export class AuthenticationService implements AuthService {
  private storage = sessionStorage;
  userSessionSource = new BehaviorSubject<UserSession | null>(null);

  get userSessionSync() {
    return this.userSessionSource.getValue();
  }

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): Observable<string> {
    return of(this.storage.getItem(environment.tokenKey) as string);
  }

  getUserSession() {
    return this.http.get<UserSessionDef>(`${environment.apiUrl}/auth/session`).pipe(
      tap((user: UserSessionDef) => {
        if (!user) throw new Error("Sesión expirada");
        this.userSessionSource.next(plainToClass(UserSession, user));
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  isAuthorized(): Observable<boolean> {
    const expiresIn = this.storage.getItem(environment.expKey);
    const token = this.storage.getItem(environment.tokenKey);

    if (!token || !expiresIn) {
      return of(false);
    }

    const expiresInMoment = moment.unix(Number(expiresIn));
    if (!expiresInMoment.isValid()) {
      return of(false);
    }

    const isAuthorized: boolean = moment().isBefore(expiresInMoment);
    return of(isAuthorized);
  }

  refreshShouldHappen(response: HttpErrorResponse): boolean {
    return false;
  }

  refreshToken(): Observable<any> {
    return of(undefined);
  }

  clearStorage() {
    this.storage.clear();
    this.userSessionSource.next(null);
  }

  logout() {
    this.clearStorage();
    this.router.navigate(["/public/login"]);
  }

  login(data: { username: string; password: string }) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
        this.storage.setItem(environment.tokenKey, response.accessToken);
        this.storage.setItem(environment.expKey, response.expiresIn.toString());
      }),
      tap((response) => {
        const user = response.user;
        if (!user) throw new Error("Sesión expirada");
        this.userSessionSource.next(plainToClass(UserSession, user));
      })
    );
  }

  register(data: {name: string; email: string; password: string}){
    return this.http.post(`${environment.apiUrl}/auth`, data);
  }
}
