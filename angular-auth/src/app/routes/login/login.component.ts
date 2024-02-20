import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authSvc = inject(AuthService);
  private _http = inject(HttpClient);
  
  public fb = inject(FormBuilder);
  public form: FormGroup = new FormGroup({});

  constructor() {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
    this.form.patchValue({
      "email": "khasogi27@live.com",
      "password": "rahasia"
    });
  }

  @HostListener('document:keydown.enter') 
  onSubmit() {
    const formData = this.form.value;
    this._authSvc.login(formData);

    // this._http.get('http://localhost:3000/api/auth/test')
    //   .subscribe(resp => {
    //     console.log(resp, 'here');
    //   });
  }
}
