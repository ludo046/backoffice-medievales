import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartenaireService } from '../../../service/partenaire/partenaire.service';
import { Router } from '@angular/router';
import { addPartenaire } from '../../../../interface/partenaire';

@Component({
  selector: 'app-add-partenaire',
  templateUrl: './add-partenaire.component.html',
  styleUrl: './add-partenaire.component.scss'
})
export class AddPartenaireComponent {
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private partenairesService: PartenaireService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
      picture : this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  createPartenaire():void{
    const partenaire : addPartenaire = {
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
      picture : this.file
    }
    this.partenairesService.createPartenaire(partenaire).subscribe(
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
