import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CampementsService } from '../../service/campement/campements.service';
import { Subscription } from 'rxjs';
import { AddCampementComponent } from '../../dialog/add/add-campement/add-campement.component';
import { getTroupe } from '../../../interface/troupe';

@Component({
  selector: 'app-home-campement',
  standalone: false,
  templateUrl: './home-campement.component.html',
  styleUrl: './home-campement.component.scss',
})
export class HomeCampementComponent {
  private allcampements: Subscription;
  public campements: getTroupe[];
  public createCard = [];
  public errorMsg : string;
  public message : string;

  constructor(
    public dialog: MatDialog,
    private campementsService : CampementsService,
    ) {}
  
  openDialog() {
    this.dialog.open(AddCampementComponent);
  }

  ngOnInit(): void {
    this.allcampements = this.campementsService.allCampement$.subscribe(
      (campement) => {
        console.log(campement);
        
        this.campements = campement
        for(let i = 0; i < this.campements.length; i++){
         const card = {
           id : this.campements[i].id,
           name : this.campements[i].companieName,
           contact : this.campements[i].contact,
           phone : this.campements[i].phone,
           //createdAt : this.campements[i].createdAt,
           town : this.campements[i].ville,
           contry : this.campements[i].pays,
           postalCode : this.campements[i].postalCode,
           description : this.campements[i].description,
           price: this.campements[i].price,
           activate: this.campements[i].activate,
           picture: this.campements[i].picture
         }
         this.createCard.push(card)
        }
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.campementsService.getAllcampements()
    if(this.createCard.length === 0){
      this.message = 'Aucune campements disponible !'
    }
  }
}

