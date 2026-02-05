import { Component, Inject, OnInit } from '@angular/core';
import { getArtisans } from '../../../../interface/artisan';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtisanService } from '../../../service/artisan/artisan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-artisan',
  templateUrl: './modify-artisan.component.html',
  styleUrl: './modify-artisan.component.scss'
})
export class ModifyArtisanComponent implements OnInit{
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;
  public id: number 
  public artisan: getArtisans
  public myartisan : Subscription
  public errMsg : string

  constructor(
    private formbuilder: FormBuilder,
    private artisanService: ArtisanService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.artisanService.getSingleArtisan(this.data)
    this.myartisan = this.artisanService.singleArtisan$.subscribe(
      (artisan) => {
        this.artisan = artisan;
        
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    
    this.form = this.formbuilder.group({
      name: this.formbuilder.control('',Validators.required),
      contact: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      email: this.formbuilder.control('', Validators.required),
      town: this.formbuilder.control('', Validators.required),
      contry: this.formbuilder.control('',Validators.required),
      postalCode: this.formbuilder.control('', Validators.required),
      description : this.formbuilder.control('', Validators.required),
      price: this.formbuilder.control('', Validators.required),
      person:this.formbuilder.control('', Validators.required),
      taille: this.formbuilder.control('', Validators.required),
      activate: this.formbuilder.control(''),
      picture : this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  modifyArtisans(){
    if(this.file === undefined){
      this.file = this.artisan.picture
    }
    const artisan : getArtisans = {
      id : this.artisan.id,
      companieName : this.form.get('name').value,
      contact : this.form.get('contact').value,
      phone : this.form.get('phone').value,
      email : this.form.get('email').value,
      ville : this.form.get('town').value,
      pays : this.form.get('contry').value,
      postalCode : this.form.get('postalCode').value,
      description : this.form.get('description').value,
      price : this.form.get('price').value,
      person : this.form.get('person').value,
      taille: this.form.get('taille').value,
      activate: this.form.get('activate').value,
      picture : this.file
    }
    this.artisanService.modifyArtisan(artisan).subscribe(
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
