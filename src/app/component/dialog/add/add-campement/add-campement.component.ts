import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampementsService } from '../../../service/campement/campements.service';
import { addcampement } from '../../../../interface/campement';

@Component({
  selector: 'app-add-campement',
  templateUrl: './add-campement.component.html',
  styleUrl: './add-campement.component.scss'
})
export class AddCampementComponent implements OnInit{

  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private campementsService: CampementsService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  createTroupe():void{
    const campement : addcampement = {
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
    this.campementsService.createCampement(campement).subscribe(
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
