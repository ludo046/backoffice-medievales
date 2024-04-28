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
      name: this.formbuilder.control('',Validators.required),
      contact: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      email: this.formbuilder.control('',Validators.required),
      town: this.formbuilder.control('', Validators.required),
      postalCode: this.formbuilder.control('', Validators.required),
      rinsing: this.formbuilder.control('', Validators.required),
      picture : this.formbuilder.control('')
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  createPartenaire():void{
    const partenaire : addPartenaire = {
      name : this.form.get('name').value,
      contact : this.form.get('contact').value,
      phone : this.form.get('phone').value,
      email : this.form.get('email').value,
      town : this.form.get('town').value,
      postalCode : this.form.get('postalCode').value,
      rising : this.form.get('rising').value,
      picture : this.file
    }
    console.log(partenaire);
    this.partenairesService.createPartenaire(partenaire).subscribe(
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
