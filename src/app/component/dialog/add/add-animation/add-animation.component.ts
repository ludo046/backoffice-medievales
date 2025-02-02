import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimationService } from '../../../service/animation/animation.service';
import { Router } from '@angular/router';
import { addtroupe } from '../../../../interface/troupe';

@Component({
  selector: 'app-add-animation',
  templateUrl: './add-animation.component.html',
  styleUrl: './add-animation.component.scss'
})
export class AddAnimationComponent {
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private animationService: AnimationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: this.formbuilder.control('',Validators.required),
      contact: this.formbuilder.control(''),
      phone: this.formbuilder.control(''),
      email: this.formbuilder.control(''),
      person: this.formbuilder.control(''),
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
    const troupe : addtroupe = {
      name : this.form.get('name').value,
      contact : this.form.get('contact').value,
      phone : this.form.get('phone').value,
      email : this.form.get('email').value,
      person : this.form.get('person').value, 
      town : this.form.get('town').value,
      contry : this.form.get('contry').value,
      postalCode : this.form.get('postalCode').value,
      description : this.form.get('description').value,
      price : this.form.get('price').value,
      picture : this.file
    }
    console.log(troupe);
    this.animationService.createTroupe(troupe).subscribe(
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
