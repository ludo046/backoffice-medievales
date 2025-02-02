import { Component } from '@angular/core';
import { ArtisanService } from '../../service/artisan/artisan.service';
import { MatDialog } from '@angular/material/dialog';
import { getArtisans } from '../../../interface/artisan';
import { Subscription } from 'rxjs';
import { AddArtisanComponent } from '../../dialog/add/add-artisan/add-artisan.component';

@Component({
  selector: 'app-home-artisans',
  standalone: false,
  templateUrl: './home-artisans.component.html',
  styleUrl: './home-artisans.component.scss'
})
export class HomeArtisansComponent {
  private allartisans: Subscription;
  public artisans: getArtisans[];
  public createCard = [];
  public errorMsg : string;
  public message : string;

  constructor(
    public dialog: MatDialog,
    private artisansService : ArtisanService,
    ) {}
  
  openDialog() {
    this.dialog.open(AddArtisanComponent);
  }

  ngOnInit(): void {
    this.allartisans = this.artisansService.allArtisan$.subscribe(
      (artisan) => {
        console.log(artisan);
        
        this.artisans = artisan
        for(let i = 0; i < this.artisans.length; i++){
         const card = {
           id : this.artisans[i].id,
           name : this.artisans[i].companieName,
           contact : this.artisans[i].contact,
           phone : this.artisans[i].phone,
           //createdAt : this.artisans[i].createdAt,
           town : this.artisans[i].ville,
           contry : this.artisans[i].pays,
           postalCode : this.artisans[i].postalCode,
           description : this.artisans[i].description,
           price: this.artisans[i].price,
           picture: this.artisans[i].picture,
           activate: this.artisans[i].activate
         }
         this.createCard.push(card)
        }
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.artisansService.getAllArtisans()
    if(this.createCard.length === 0){
      this.message = 'Aucune artisans disponible !'
    }
  }
}
