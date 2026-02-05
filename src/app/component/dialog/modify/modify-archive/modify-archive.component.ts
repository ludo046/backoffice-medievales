import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getArchive } from '../../../../interface/archive';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArchiveService } from '../../../service/archive/archive.service';

@Component({
  selector: 'app-modify-archive',
  templateUrl: './modify-archive.component.html',
  styleUrl: './modify-archive.component.scss'
})
export class ModifyArchiveComponent {
  file: File;
  public form: FormGroup;
  public url: string;
  public selectedFiles: File;
  public errorMsg: any;
  public id: number 
  public archive: getArchive
  public myArchive : Subscription
  public errMsg : string
  public checked = true;

  constructor(
    private formbuilder: FormBuilder,
    private archiveService: ArchiveService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.archiveService.getSingleArchive(this.data)
    this.myArchive = this.archiveService.singleArchive$.subscribe(
      (archive) => {
        this.archive = archive; 
      },
      (error) => {
        this.errMsg = JSON.stringify(error);
      }
    );
    this.form = this.formbuilder.group({
      picture : this.formbuilder.control(''),
      years: this.formbuilder.control('',Validators.required),
      teaser: this.formbuilder.control(''),
    })
  }

  onFileAdded(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  modifyArchive(){
    if(this.file === undefined){
      this.file = this.archive.picture
    }
    const archive : getArchive = {
      id : this.archive.id,
      picture : this.file,
      years : this.form.get('years').value,
      teaser : this.form.get('teaser').value,
    }
    this.archiveService.modifyArchive(archive).subscribe(
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
