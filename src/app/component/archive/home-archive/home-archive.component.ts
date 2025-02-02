import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { getArchive } from '../../../interface/archive';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveService } from '../../service/archive/archive.service';
import { AddArchiveComponent } from '../../dialog/add/add-archive/add-archive.component';

@Component({
  selector: 'app-home-archive',
  templateUrl: './home-archive.component.html',
  styleUrl: './home-archive.component.scss'
})
export class HomeArchiveComponent {
  private allarchives: Subscription;
  public archives: getArchive[];
  public createCard = [];
  public errorMsg : string;
  public message : string;

  constructor(
    public dialog: MatDialog,
    private archiveService : ArchiveService,
    ) {}
  
  openDialog() {
    this.dialog.open(AddArchiveComponent);
  }

  ngOnInit(): void {
    this.allarchives = this.archiveService.allArchive$.subscribe(
      (archive) => {
        console.log(archive);
        
        this.archives = archive
        for(let i = 0; i < this.archives.length; i++){
         const card = {
           id : this.archives[i].id,
           picture: this.archives[i].picture,
           name : this.archives[i].years,
           contact : this.archives[i].teaser,
         }
         this.createCard.push(card)
        }
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.archiveService.getAllArchives()
    if(this.createCard.length === 0){
      this.message = 'Aucune archive disponible !'
    }
  }
}
