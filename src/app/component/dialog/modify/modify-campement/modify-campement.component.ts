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
    this.mycampement = this.campementService.singlecampement$.subscribe(
      (campement) => {
        this.campement = campement;
        console.log(this.campement);
        
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    console.log(this.mycampement);
    
    this.form = this.formbuilder.group({
      name: this.formbuilder.control('',Validators.required),
      contact: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      town: this.formbuilder.control('', Validators.required),
      contry: this.formbuilder.control('',Validators.required),
      postalCode: this.formbuilder.control('', Validators.required),
      description : this.formbuilder.control('', Validators.required),
      price: this.formbuilder.control('', Validators.required),
      picture : this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  modifycampement(){
    if(this.file === undefined){
      this.file = this.campement.picture
    }
    const campement : getTroupe = {
      id : this.campement.id,
      name : this.form.get('name').value,
      contact : this.form.get('contact').value,
      phone : this.form.get('phone').value,
      town : this.form.get('town').value,
      contry : this.form.get('contry').value,
      postalCode : this.form.get('postalCode').value,
      description : this.form.get('description').value,
      price : this.form.get('price').value,
      picture : this.file
    }
    console.log(campement);
    this.campementService.modifyCampement(campement).subscribe(
      (result) => {
          //this.router.navigate([this.urlPage + "/" +suppUrl])
          if(result){
            console.log('ok');
            window.location.reload()
          }
          console.log(campement);
          
      },
      error => {
      this.errorMsg = error.error.message
      }
    )
  }

}
