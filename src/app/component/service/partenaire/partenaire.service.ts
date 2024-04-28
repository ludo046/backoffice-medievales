import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { addPartenaire, getPartenaire } from '../../../interface/partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  private ressourceUrl = environment.partenaireUrl;
  public formData : any;
  public allPartenaires$ = new Subject<any>();
  public singlePartenaire$ = new Subject<any>();

  constructor(
    private httpClient : HttpClient
  ) { }

  createPartenaire(addpartenaire : addPartenaire):Observable<{}>{
    const formData = new FormData();
    formData.append('name', addpartenaire.name)
    formData.append('contact', addpartenaire.contact)
    formData.append('phone', addpartenaire.phone)
    formData.append('email', addpartenaire.email)
    formData.append('town', addpartenaire.town)
    formData.append('postalCode', addpartenaire.postalCode)
    formData.append('rising', addpartenaire.rising)
    formData.append('image', addpartenaire.picture);
    console.log(formData);
    
    return this.httpClient.post(`${this.ressourceUrl}add`,formData);
  }


  getAllPartenaires():void{
    this.httpClient.get(`${this.ressourceUrl}get`).subscribe(
      (ressources) => {
        this.allPartenaires$.next(ressources);
      },
      (error) => {
        this.allPartenaires$.next([]);
      }
    )
  }

  modifyPartenaire(modifypartenaire : getPartenaire){
    const formData = new FormData();
    formData.append('id', modifypartenaire.id)
    formData.append('name', modifypartenaire.name)
    formData.append('contact', modifypartenaire.contact)
    formData.append('phone', modifypartenaire.phone)
    formData.append('email', modifypartenaire.email)
    formData.append('town', modifypartenaire.town)
    formData.append('postalCode', modifypartenaire.postalCode)
    formData.append('rising', modifypartenaire.rising)
    formData.append('image', modifypartenaire.picture);
    return this.httpClient.put(`${this.ressourceUrl}modify/${modifypartenaire.id}`, formData)
    }
    
    getSinglePartenaire(partenaireId: number){
      return this.httpClient.get(`${this.ressourceUrl}get/`+partenaireId).subscribe(
        (ressource) => {
          this.singlePartenaire$.next(ressource);
        },
        (error) => {
          this.singlePartenaire$.next([]);
        }
      )
    }

    deletePartenaire(id: number){
      return this.httpClient.delete(`${this.ressourceUrl}delete/`+ id)
    }
  
}
