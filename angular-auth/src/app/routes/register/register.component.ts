import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { IError, IPostResponse } from '../../shared/interfaces/response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent extends LoginComponent {
  public formRegister: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    ...this.formLogin.controls
  });
  public override arrError: IError = { fullName: '', email: '', password: '' };

  constructor() {
    super();
  }

  override get passwordVisible(): boolean {
    return this.formRegister.controls['password'].value != '';
  }

  override onSubmit(): void {
    const formData = this.formRegister.value;
    this._authSvc.register(formData)
      .subscribe((resp: IPostResponse) => {
        console.log(resp.code, 'resp.code');
        if (resp.code == 0) {
          console.log(resp, 'result register onSubmit');
          return;
        }
        const getError = resp.result.errors;
        console.log(getError, 'getError');
        if (getError) {
          this.arrError = { 
            fullName: getError.fullName ? getError.fullName[0] : '',
            email: getError.email ? getError.email[0] : '',
            password: getError.password ? getError.password[0] : ''
          }
        }
      });
  }
}

