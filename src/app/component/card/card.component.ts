import { Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyTroupeComponent } from '../dialog/modify/modify-troupe/modify-troupe.component';
import { TroupeService } from '../service/troupe/troupe.service';
import { ModifyCampementComponent } from '../dialog/modify/modify-campement/modify-campement.component';
import { CampementsService } from '../service/campement/campements.service';
import { ArtisanService } from '../service/artisan/artisan.service';
import { ModifyArtisanComponent } from '../dialog/modify/modify-artisan/modify-artisan.component';
import { ModifyPartenaireComponent } from '../dialog/modify/modify-partenaire/modify-partenaire.component';
import { PartenaireService } from '../service/partenaire/partenaire.service';
import { AnimationService } from '../service/animation/animation.service';
import { ModifyAnimationComponent } from '../dialog/modify/modify-animation/modify-animation.component';
import { ArchiveService } from '../service/archive/archive.service';
import { ModifyArchiveComponent } from '../dialog/modify/modify-archive/modify-archive.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() createCard: [];
  public cardId
  private component : string

  constructor(
    public dialog: MatDialog,
    private troupeService : TroupeService,
    private campementService : CampementsService,
    private artisanService : ArtisanService,
    private partenaireService : PartenaireService,
    private animationService : AnimationService,
    private archiveService : ArchiveService,
    ) {}

  ngOnInit(): void {
    this.component = window.location.href.split('/')[3]
  }

  openDialog(id : number) {
    this.cardId = id
    if(this.component === "homeTroupes"){
      this.dialog.open(ModifyTroupeComponent, {data: id});
    }
    if(this.component === "homeCampements"){
      this.dialog.open(ModifyCampementComponent, {data : id})
    }
    if(this.component === "homeArtisans"){
      this.dialog.open(ModifyArtisanComponent, {data : id})
    }
    if(this.component === "homePartenaires"){
      this.dialog.open(ModifyPartenaireComponent, {data : id})
    }
    if(this.component === "homeAnimations"){
      this.dialog.open(ModifyAnimationComponent, {data : id})
    }
    if(this.component === "HomeArchives"){
      this.dialog.open(ModifyArchiveComponent, {data : id})
    }
  }

  deleteTroupe(id : number){
    if(this.component === "homeTroupes"){
      this.troupeService.deleteTroupe(id).subscribe(
        () => {
          window.location.reload()
        }  
      )
    }
    if(this.component === "homeCampements"){
      this.campementService.deleteCampement(id).subscribe(
        () => {
          window.location.reload()
        }  
      )
    }
    if(this.component === "homeArtisans"){
      this.artisanService.deleteArtisan(id).subscribe(
        () => {
          window.location.reload()
        }  
      )
    }
    if(this.component === "homePartenaires"){
      this.partenaireService.deletePartenaire(id).subscribe(
        () => {
          window.location.reload()
        }  
      )
    }
    if(this.component === "homeAnimations"){
      this.animationService.deleteTroupe(id).subscribe(
        () => {
          window.location.reload()
        }  
      )
    }
    if(this.component === "HomeArchives"){
      this.archiveService.deleteArchive(id).subscribe(
        () => {
          window.location.reload()
        }  
      )
    }
  }
}
