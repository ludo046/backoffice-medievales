import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})
export class LoginComponent implements OnInit{
  public hide = true;
  public form :  FormGroup;
  public errMsg : string;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private authService : AuthService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      password: this.formBuilder.control('',[Validators.required, Validators.minLength(4)])
    });
  }

  login(){
    const formLogin = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }
    console.log(formLogin);
    
    this.authService.login(formLogin).subscribe(
      result => {
      sessionStorage[`session`] = JSON.stringify(result);
      setTimeout(() => {
        this.router.navigate(['home'])
      }, 1000);
    },
    error => {
      this.errMsg = error.error.message,
      console.log(error.error.message);
    })
    
  }
}
