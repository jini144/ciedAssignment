import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceApiService } from '../service-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Emailaddress:any;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ServiceApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(){
    if (this.loginForm.valid) {
      this.apiService.loginUser(this.loginForm.value['username'], this.loginForm.value['password'], "fgdg").subscribe({
        next: (data:any) => {
          localStorage.setItem('BEARER', data.data.token);
          localStorage.setItem('USER-ID', data.data.id);
          this.router.navigate(['/dashboard']);
        },
        error: (e) => {
          alert("fail")
        }
      })

  }
}

}
