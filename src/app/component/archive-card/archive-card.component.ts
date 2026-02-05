import { Component, Input } from '@angular/core';
import { ArchiveService } from '../service/archive/archive.service';
import { MatDialog } from '@angular/material/dialog';
import { ModifyArchiveComponent } from '../dialog/modify/modify-archive/modify-archive.component';

@Component({
  selector: 'app-archive-card',
  templateUrl: './archive-card.component.html',
  styleUrl: './archive-card.component.scss'
})
export class ArchiveCardComponent {
  constructor(
    private archiveService: ArchiveService,
    public dialog: MatDialog,
  ) { }

  @Input() createCard: [];
  public cardId

  openDialog(id: number) {
    this.cardId = id
    this.dialog.open(ModifyArchiveComponent, { data: id })
  }

  deleteArchive(id: number) {
    this.archiveService.deleteArchive(id).subscribe(
      () => {
        window.location.reload()
      }
    )
  }


}
