import { Component, Inject } from '@angular/core';
import { getTroupe } from '../../../../interface/troupe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampementsService } from '../../../service/campement/campements.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCampements } from '../../../../interface/campement';

@Component({
  selector: 'app-modify-campement',
  templateUrl: './modify-campement.component.html',
  styleUrl: './modify-campement.component.scss'
})
export class ModifyCampementComponent {
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;
  public id: number 
  public campement: getTroupe
  public mycampement : Subscription
  public errMsg : string

  constructor(
    private formbuilder: FormBuilder,
    private campementService: CampementsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.campementService.getSingleCampement(this.data)
    console.log(this.data)
    this.mycampement = this.campementService.singlecampement$.subscribe(
      (campement) => {
        this.campement = campement; 
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    
    this.form = this.formbuilder.group({
      companieName: this.formbuilder.control('',Validators.required),
      contact: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      email: this.formbuilder.control(''),
      person: this.formbuilder.control(''),
      town: this.formbuilder.control('', Validators.required),
      contry: this.formbuilder.control('',Validators.required),
      postalCode: this.formbuilder.control('', Validators.required),
      description : this.formbuilder.control('', Validators.required),
      price: this.formbuilder.control('', Validators.required),
      picture : this.formbuilder.control(''),
      activate : this.formbuilder.control('') 
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  modifyCampement(){
    if(this.file === undefined){
      this.file = this.campement.picture
    }
    const campement  = {
      id : this.campement.id,
      companieName : this.form.get('companieName').value,
      contact : this.form.get('contact').value,
      email : this.form.get('email').value,
      person : this.form.get('person').value,
      phone : this.form.get('phone').value,
      ville : this.form.get('town').value,
      pays : this.form.get('contry').value,
      postalCode : this.form.get('postalCode').value,
      description : this.form.get('description').value,
      price : this.form.get('price').value,
      picture : this.file,
      activate : this.form.get('activate').value 
    }
    this.campementService.modifyCampement(campement).subscribe(
      (result) => {
          //this.router.navigate([this.urlPage + "/" +suppUrl])
          if(result){
            window.location.reload()
          }
      },
      error => {
      this.errorMsg = error.error.message
      }
    )
  }

}
