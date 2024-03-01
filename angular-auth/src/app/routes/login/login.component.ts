import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IError, IPostResponse } from '../../shared/interfaces/response';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public arrError: IError = { email: '', password: '' };
  public isPassword: boolean = true;
  public _authSvc: AuthService = inject(AuthService);
  
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  get passwordVisible (): boolean {
    return this.formLogin.controls['password'].value != '';
  }

  @HostListener('document:keydown.enter') 
  onSubmit(): void {
    const formData = this.formLogin.value;
    this._authSvc.login(formData)
      .subscribe((resp: IPostResponse) => {
        if (resp.code != 0) {
          const getError = resp.result.errors;
          console.log(getError, 'getError');
          if (getError) {
            // this.arrError = { 
            //   email: getError.email ? getError.email[0] : '', 
            //   password: getError.password ? getError.password[0] : ''
            // }
          }
          return;
        }
        console.log(resp, 'result login onSubmit');
      });
  }
}
