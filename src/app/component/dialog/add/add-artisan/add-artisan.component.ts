import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../../../service/artisan/artisan.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Addartisan } from '../../../../interface/artisan';

@Component({
  selector: 'app-add-artisan',
  templateUrl: './add-artisan.component.html',
  styleUrl: './add-artisan.component.scss'
})
export class AddArtisanComponent implements OnInit{
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private artisansService: ArtisanService,
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
      taille: this.formbuilder.control('', Validators.required),
      picture : this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  createTroupe():void{
    const artisan : Addartisan = {
      name : this.form.get('name').value,
      contact : this.form.get('contact').value,
      phone : this.form.get('phone').value,
      town : this.form.get('town').value,
      contry : this.form.get('contry').value,
      postalCode : this.form.get('postalCode').value,
      description : this.form.get('description').value,
      price : this.form.get('price').value,
      taille : this.form.get('taille').value,
      picture : this.file
    }
    console.log(artisan);
    this.artisansService.createArtisan(artisan).subscribe(
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
