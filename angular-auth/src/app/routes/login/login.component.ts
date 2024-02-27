import { Component, HostListener, inject } from '@angular/core';
import { AuthService, PostResponse } from '../../core/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface IUserLogin {
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public arrError: { email?: string, password?: string } = { email: '', password: '' };
  public isPassword: boolean = true;
  public _authSvc = inject(AuthService);
  
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  get passwordVisible () {
    return this.formLogin.controls['password'].value != '';
  }

  @HostListener('document:keydown.enter') 
  onSubmit() {
    const formData = this.formLogin.value;
    this._authSvc.login(formData).subscribe((resp: PostResponse) => {
      if (resp.code != 0) {
        const { email, password } = resp.result?.errors!;
        this.arrError = { email: email ? email : '', password: password ? password : '' };
        return;
      }
      console.log(resp, 'result onSubmit');
    });
  }
}
