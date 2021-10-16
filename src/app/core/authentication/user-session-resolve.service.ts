import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {AuthenticationService} from './authentication.service';
import {UserSession} from "./models/user-session.model";

@Injectable({
  providedIn: 'root'
})
export class UserSessionResolveService implements Resolve<UserSession>{

  constructor(
    private authService: AuthenticationService
  ) { }

  /**
   * Este resolver se ejecuta antes de cargar las rutas donde se implementa
   * La idea es retornar el usuario de la sesión antes de que carguen las rutas privadas
   * y obtener un state del mismo, para almacenarlo en authService
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserSession> | Promise<UserSession> | UserSession {
    return this.authService.userSessionSync || this.authService.getUserSession().pipe(tap(console.log))
  }
}
