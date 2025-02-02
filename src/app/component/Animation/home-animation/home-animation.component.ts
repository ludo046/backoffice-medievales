import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { getTroupe } from '../../../interface/troupe';
import { MatDialog } from '@angular/material/dialog';
import { AnimationService } from '../../service/animation/animation.service';
import { AddAnimationComponent } from '../../dialog/add/add-animation/add-animation.component';

@Component({
  selector: 'app-home-animation',
  standalone: false,
  templateUrl: './home-animation.component.html',
  styleUrl: './home-animation.component.scss',
  
})
export class HomeAnimationComponent {
  private alltroupe: Subscription;
  public troupes: getTroupe[];
  public createCard = [];
  public errorMsg : string;
  public message : string;

  constructor(
    public dialog: MatDialog,
    private animationService : AnimationService,
    ) {}

  openDialog() {
    this.dialog.open(AddAnimationComponent);
  }

  ngOnInit(): void {
    this.alltroupe = this.animationService.allAnimation$.subscribe(
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
    this.animationService.getAllTroupes()
    if(this.createCard.length === 0){
      this.message = 'Aucune animation disponible !'
    }
  }
}
