import {HttpErrorResponse} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {UIComponentsService} from "../../../core/shared/services/ui-components.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hidePass = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private ui: UIComponentsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get name(){
    return this.form.get('name') as AbstractControl;
  }

  get email(){
    return this.form.get('email') as AbstractControl;
  }

  get password(){
    return this.form.get('password') as AbstractControl;
  }

  save(){
    const values = this.form.value;
    this.loading = true;
    this.authService.register(values).subscribe(
      () => {
        this.ui.showSnackNotification({customMsg: 'Registro exitoso, puede iniciar sesión'});
        this.router.navigate(['/', 'public', 'login']);
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        if(error.status === 409){
          this.ui.showSnackNotification({customMsg: 'El correo electrónico se encuentra en uso'});
          return;
        }

        this.ui.internalError({error});
      }
    )
  }
}
