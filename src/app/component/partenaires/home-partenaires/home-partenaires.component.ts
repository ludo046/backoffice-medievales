import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PartenaireService } from '../../service/partenaire/partenaire.service';
import { AddPartenaireComponent } from '../../dialog/add/add-partenaire/add-partenaire.component';
import { getPartenaire } from '../../../interface/partenaire';

@Component({
  selector: 'app-home-partenaires',
  standalone: false,
  templateUrl: './home-partenaires.component.html',
  styleUrl: './home-partenaires.component.scss',
})
export class HomePartenairesComponent {
  private allpartenaires: Subscription;
  public partenaires: getPartenaire[];
  public createCard = [];
  public errorMsg : string;
  public message : string;

  constructor(
    public dialog: MatDialog,
    private partenairesService : PartenaireService,
    ) {}
  
  openDialog() {
    this.dialog.open(AddPartenaireComponent);
  }

  ngOnInit(): void {
    this.allpartenaires = this.partenairesService.allPartenaires$.subscribe(
      (partenaire) => {
        console.log(partenaire);

        this.partenaires = partenaire
        this.partenaires.sort(function compare(a, b) {
          if (a.montant > b.montant)
             return -1;
          if (a.montant < b.montant )
             return 1;
          return 0;
        });
        for(let i = 0; i < this.partenaires.length; i++){
         const card = {
           id : this.partenaires[i].id,
           partenaireName : this.partenaires[i].partenaireName,
           contact : this.partenaires[i].contact,
           email : this.partenaires[i].email,
           phone : this.partenaires[i].phone,
           formule : this.partenaires[i].formule,
           montant : this.partenaires[i].montant,
           adresse : this.partenaires[i].adresse,
           reglement: this.partenaires[i].reglement,
           site: this.partenaires[i].site,
           activate: this.partenaires[i].activate,
           picture: this.partenaires[i].picture
         }
         this.createCard.push(card)
        }


      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.partenairesService.getAllPartenaires()
    if(this.createCard.length === 0){
      this.message = 'Aucune partenaires disponible !'
    }
  }
}
