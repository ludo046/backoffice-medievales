import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getPartenaire } from '../../../../interface/partenaire';
import { Subscription } from 'rxjs';
import { PartenaireService } from '../../../service/partenaire/partenaire.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-partenaire',
  templateUrl: './modify-partenaire.component.html',
  styleUrl: './modify-partenaire.component.scss'
})
export class ModifyPartenaireComponent implements OnInit{

  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;
  public id: number 
  public partenaire: getPartenaire
  public mypartenaire : Subscription
  public errMsg : string

  constructor(
    private formbuilder: FormBuilder,
    private partenaireService: PartenaireService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.partenaireService.getSinglePartenaire(this.data)
    this.mypartenaire = this.partenaireService.singlePartenaire$.subscribe(
      (partenaire) => {
        this.partenaire = partenaire;
        console.log(this.partenaire);
        
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    console.log(this.mypartenaire);
    
    this.form = this.formbuilder.group({
      partenaireName: this.formbuilder.control('',Validators.required),
      contact: this.formbuilder.control(''),
      email: this.formbuilder.control('',Validators.required),
      phone: this.formbuilder.control(''),
      formule: this.formbuilder.control('', Validators.required),
      montant: this.formbuilder.control('', Validators.required),
      adresse: this.formbuilder.control('', Validators.required),
      reglement: this.formbuilder.control('', Validators.required),
      site: this.formbuilder.control('', Validators.required),
      texte: this.formbuilder.control(''),
      picture : this.formbuilder.control(''),
      activate : this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  modifyPartenaire(){
    if(this.file === undefined){
      this.file = this.partenaire.picture
    }
    const partenaire : getPartenaire = {
      id : this.partenaire.id,
      partenaireName : this.form.get('partenaireName').value,
      contact : this.form.get('contact').value,
      email : this.form.get('email').value,
      phone : this.form.get('phone').value,
      formule : this.form.get('formule').value,
      montant : this.form.get('montant').value,
      adresse : this.form.get('adresse').value,
      reglement : this.form.get('reglement').value,
      site : this.form.get('site').value,
      texte : this.form.get('texte').value,
      activate : this.form.get('activate').value,
      picture : this.file
    }
    console.log(partenaire);
    this.partenaireService.modifyPartenaire(partenaire).subscribe(
      (result) => {
          //this.router.navigate([this.urlPage + "/" +suppUrl])
          if(result){
            console.log('ok');
            window.location.reload()
          }
          console.log(partenaire);
          
      },
      error => {
      this.errorMsg = error.error.message
      }
    )
  }

}
