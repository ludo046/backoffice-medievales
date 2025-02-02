import { Component, OnInit } from '@angular/core';
import { AddTroupeComponent } from '../../dialog/add/add-troupe/add-troupe.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TroupeService } from '../../service/troupe/troupe.service';
import { getTroupe } from '../../../interface/troupe';


@Component({
  selector: 'app-home-troupes',
  standalone: false,
  templateUrl: './home-troupes.component.html',
  styleUrl: './home-troupes.component.scss',
})
export class HomeTroupesComponent implements OnInit{

  private alltroupe: Subscription;
  public troupes: getTroupe[];
  public createCard = [];
  public errorMsg : string;
  public message : string;

  constructor(
    public dialog: MatDialog,
    private troupesService : TroupeService,
    ) {}

  openDialog() {
    this.dialog.open(AddTroupeComponent);
  }

  ngOnInit(): void {
    this.alltroupe = this.troupesService.allTroupes$.subscribe(
      (troupes) => {
        console.log(troupes);
        
        this.troupes= troupes
        for(let i = 0; i < this.troupes.length; i++){
         const card = {
           id : this.troupes[i].id,
           name : this.troupes[i].companieName,
           contact : this.troupes[i].contact,
           phone : this.troupes[i].phone,
           //createdAt : this.troupes[i].createdAt,
           town : this.troupes[i].ville,
           contry : this.troupes[i].pays,
           postalCode : this.troupes[i].postalCode,
           description : this.troupes[i].description,
           price: this.troupes[i].price,
           picture: this.troupes[i].picture,
           activate: this.troupes[i].activate
         }
         this.createCard.push(card)
        }
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.troupesService.getAllTroupes()
    if(this.createCard.length === 0){
      this.message = 'Aucune troupes disponible !'
    }
  }
}

