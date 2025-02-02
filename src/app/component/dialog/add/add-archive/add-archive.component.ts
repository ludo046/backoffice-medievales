import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArchiveService } from '../../../service/archive/archive.service';
import { Router } from '@angular/router';
import { AddArchive } from '../../../../interface/archive';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrl: './add-archive.component.scss'
})
export class AddArchiveComponent {
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;

  constructor(
    private formbuilder: FormBuilder,
    private archivesService: ArchiveService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      picture : this.formbuilder.control(''),
      years: this.formbuilder.control('',Validators.required),
      teaser: this.formbuilder.control(''),

    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  createArchives():void{
    const archive : AddArchive = {
      picture : this.file,
      years : this.form.get('years').value,
      teaser : this.form.get('teaser').value,
      
    }
    console.log(archive);
    this.archivesService.createArchive(archive).subscribe(
      (result) => {
          //this.router.navigate([this.urlPage + "/" +suppUrl])
          if(result){
            console.log('ok');
          }
          console.log(archive);
          window.location.reload()
      },
      error => {
      this.errorMsg = error.error.message
      }
    )
  }
}
