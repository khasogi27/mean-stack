import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUserLogin, LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';

export interface IUserRegister extends IUserLogin {
  fullname: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent extends LoginComponent {
  public formRegister: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    ...this.formLogin.controls
  });

  override get passwordVisible(): boolean {
    return this.formRegister.controls['password'].value != '';
  }

  override onSubmit(): void {
    const formData = this.formRegister.value;
    this._authSvc.register(formData);
  }
}

