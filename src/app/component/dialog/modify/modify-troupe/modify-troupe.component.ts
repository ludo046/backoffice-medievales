import { Component, Inject, Input, inject, input } from '@angular/core';
import { addtroupe, getTroupe } from '../../../../interface/troupe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TroupeService } from '../../../service/troupe/troupe.service';
import { CardComponent } from '../../../card/card.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-troupe',
  templateUrl: './modify-troupe.component.html',
  styleUrl: './modify-troupe.component.scss'
})
export class ModifyTroupeComponent {
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;
  public id: number 
  public troupe: getTroupe
  public myTroupe : Subscription
  public errMsg : string

  constructor(
    private formbuilder: FormBuilder,
    private troupeService: TroupeService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.troupeService.getSingleTroupe(this.data)
    this.myTroupe = this.troupeService.singleTroupe$.subscribe(
      (troupe) => {
        this.troupe = troupe;
        console.log(this.troupe);
        
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    console.log(this.myTroupe);
    
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

  modifyTroupe(){
    if(this.file === undefined){
      this.file = this.troupe.picture
    }
    const troupe : getTroupe = {
      id : this.troupe.id,
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
    console.log(troupe);
    this.troupeService.modifyTroupe(troupe).subscribe(
      (result) => {
          //this.router.navigate([this.urlPage + "/" +suppUrl])
          if(result){
            console.log('ok');
            window.location.reload()
          }
          console.log(troupe);
          
      },
      error => {
      this.errorMsg = error.error.message
      }
    )
  }
}
