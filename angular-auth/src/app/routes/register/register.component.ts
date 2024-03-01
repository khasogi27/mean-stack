import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { IPostResponse } from '../../shared/interfaces/response';

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
    this._authSvc.register(formData)
      .subscribe((resp: IPostResponse) => {
        console.log(resp.code, 'resp.code');
        if (resp.code != 0) {
          console.log(resp.result.errors);
          return;
        }
        console.log(resp, 'result register onSubmit');
      });
  }
}

