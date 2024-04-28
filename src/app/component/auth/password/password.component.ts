import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';



@Component({
  selector: 'app-password',
  standalone: false,
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent implements OnInit{
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
      code : this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      password: this.formBuilder.control('',[Validators.required, Validators.minLength(4)])
    });
  }

  createPassword(){
    const formPassword = {
      email: this.form.get('email').value,
      code: this.form.get('code').value,
      password: this.form.get('password').value
    }
    console.log(formPassword);
    
    this.authService.createPassword(formPassword).subscribe(
      result => {
        if(result){
          setTimeout(() => {
            this.router.navigate(['login'])
          }, 1000);
        }
    },
    error => {
      this.errMsg = error.error.message,
      console.log(error.error.message);
    })
    
  }
}





