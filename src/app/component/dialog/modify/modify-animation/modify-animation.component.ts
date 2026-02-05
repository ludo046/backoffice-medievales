import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getTroupe } from '../../../../interface/troupe';
import { Subscription } from 'rxjs';
import { TroupeService } from '../../../service/troupe/troupe.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationService } from '../../../service/animation/animation.service';

@Component({
  selector: 'app-modify-animation',
  templateUrl: './modify-animation.component.html',
  styleUrl: './modify-animation.component.scss'
})
export class ModifyAnimationComponent {

  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;
  public id: number
  public troupe: getTroupe
  public myTroupe: Subscription
  public errMsg: string
  public checked = true;

  constructor(
    private formbuilder: FormBuilder,
    private animationService: AnimationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.animationService.getSingleTroupe(this.data)
    this.myTroupe = this.animationService.singleAnimation$.subscribe(
      (troupe) => {
        this.troupe = troupe;
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    this.form = this.formbuilder.group({
      companieName: this.formbuilder.control('', Validators.required),
      contact: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      email: this.formbuilder.control(''),
      person: this.formbuilder.control(''),
      town: this.formbuilder.control('', Validators.required),
      contry: this.formbuilder.control('', Validators.required),
      postalCode: this.formbuilder.control('', Validators.required),
      description: this.formbuilder.control('', Validators.required),
      price: this.formbuilder.control('', Validators.required),
      picture: this.formbuilder.control(''),
      activate: this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  modifyTroupe() {
    if (this.file === undefined) {
      this.file = this.troupe.picture
    }
    const troupe: getTroupe = {
      id: this.troupe.id,
      companieName: this.form.get('companieName').value,
      contact: this.form.get('contact').value,
      email: this.form.get('email').value,
      person: this.form.get('person').value,
      phone: this.form.get('phone').value,
      ville: this.form.get('town').value,
      pays: this.form.get('contry').value,
      postalCode: this.form.get('postalCode').value,
      description: this.form.get('description').value,
      price: this.form.get('price').value,
      picture: this.file,
      activate: this.form.get('activate').value
    }

    this.animationService.modifyTroupe(troupe).subscribe(
      (result) => {
        //this.router.navigate([this.urlPage + "/" +suppUrl])
        if (result) {
          window.location.reload()
        }
      },
      error => {
        this.errorMsg = error.error.message
      }
    )
  }
}
