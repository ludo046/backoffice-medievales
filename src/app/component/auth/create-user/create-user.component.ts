import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit{

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
      firstname : this.formBuilder.control('', Validators.required),
      lastname : this.formBuilder.control('', Validators.required),
      email : this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      password: this.formBuilder.control('',[Validators.required, Validators.minLength(4)]),
      role: this.formBuilder.control('',Validators.required),
      commission : this.formBuilder.control('', Validators.required)
    });
  }

  createUser(){
    const formCreateUser = {
      firstname: this.form.get('fistname').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      role: this.form.get('role').value,
      commission: this.form.get('commission').value
    }
    console.log(formCreateUser);
    
    this.authService.login(formCreateUser).subscribe(
      () => {
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
