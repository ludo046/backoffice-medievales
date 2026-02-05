import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userModel } from '../../../../interface/auth';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  public form: FormGroup;
  public errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      firstname: this.formbuilder.control('', Validators.required),
      lastname: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      email: this.formbuilder.control('', [Validators.required, Validators.email]),
      // tu as un password dans le TS d’origine, mais aucune input, donc je le retire
      // password: this.formbuilder.control('', Validators.required),
      isAdmin: this.formbuilder.control(false),
    });
  }

  createUser(): void {
    const user: userModel = {
      firstname: this.form.get('firstname')?.value,
      lastname: this.form.get('lastname')?.value,
      phone: this.form.get('phone')?.value,
      email: this.form.get('email')?.value,
      isAdmin: this.form.get('isAdmin')?.value || false,
      // les flags (troupe, artisan, etc.) pourront être gérés ensuite dans le dialog “Droits”
    };

    this.authService.register(user).subscribe(
      () => {
      },
      (error) => {
        this.errorMsg = error?.error?.message || 'Erreur lors de la création';
      }
    );
  }
}
