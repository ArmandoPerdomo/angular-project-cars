import {HttpErrorResponse} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {UIComponentsService} from "../../../core/shared/services/ui-components.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hidePass = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService,
    private ui: UIComponentsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email(){
    return this.form.get('email') as AbstractControl;
  }

  get password(){
    return this.form.get('password') as AbstractControl;
  }

  login() {
    this.loading = true;
    const data = this.form.value;
    this.authService.login({username: data['email'], password: data['password']}).subscribe(
      () => {
        this.router.navigate(['/private/cars']);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 404)) {
          this.ui.showSnackNotification({customMsg: "Usuario o Contraseña incorrectos", });
          return;
        }
      }
    )
  }

}
