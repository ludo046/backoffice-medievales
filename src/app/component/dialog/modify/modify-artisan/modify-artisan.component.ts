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
        console.log(this.artisan);
        
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    console.log(this.myartisan);
    
    this.form = this.formbuilder.group({
      name: this.formbuilder.control('',Validators.required),
      contact: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      town: this.formbuilder.control('', Validators.required),
      contry: this.formbuilder.control('',Validators.required),
      postalCode: this.formbuilder.control('', Validators.required),
      description : this.formbuilder.control('', Validators.required),
      price: this.formbuilder.control('', Validators.required),
      taille: this.formbuilder.control('', Validators.required),
      picture : this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  modifyArtisan(){
    if(this.file === undefined){
      this.file = this.artisan.picture
    }
    const artisan : getArtisans = {
      id : this.artisan.id,
      name : this.form.get('name').value,
      contact : this.form.get('contact').value,
      phone : this.form.get('phone').value,
      town : this.form.get('town').value,
      contry : this.form.get('contry').value,
      postalCode : this.form.get('postalCode').value,
      description : this.form.get('description').value,
      price : this.form.get('price').value,
      taille: this.form.get('taille').value,
      picture : this.file
    }
    console.log(artisan);
    this.artisanService.modifyArtisan(artisan).subscribe(
      (result) => {
          //this.router.navigate([this.urlPage + "/" +suppUrl])
          if(result){
            console.log('ok');
            window.location.reload()
          }
          console.log(artisan);
          
      },
      error => {
      this.errorMsg = error.error.message
      }
    )
  }
}
