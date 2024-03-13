import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IError, IPostResponse } from '../../shared/interfaces/response';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public arrError: IError = { email: '', password: '' };
  public isPassword: boolean = true;
  public _authSvc: AuthService = inject(AuthService);
  
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(4),
      Validators.maxLength(30),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ])
  });

  constructor() {}

  get passwordVisible (): boolean {
    return this.formLogin.controls['password'].value != '';
  }

  @HostListener('document:keydown.enter') 
  onSubmit(): void {
    const formData = this.formLogin.value;
    this._authSvc.login(formData)
      .subscribe((resp: IPostResponse) => {
        if (resp.code == 0) {
          console.log(resp, 'result login onSubmit');
          return;
        }
        const getError = resp.result.errors;
        console.log(getError, 'getError');
        if (getError) {
          this.arrError = { 
            email: getError.email ? getError.email[0] : '',
            password: getError.password ? getError.password[0] : ''
          }
        }
      });
  }
}
