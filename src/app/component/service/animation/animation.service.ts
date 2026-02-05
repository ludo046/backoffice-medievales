import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { addtroupe, getTroupe } from '../../../interface/troupe';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  private ressourceUrl = environment.animationUrl;
  public formData : any;
  public allAnimation$ = new Subject<any>();
  public singleAnimation$ = new Subject<any>();

  constructor(
    private httpClient : HttpClient
  ) { }

  createTroupe(addtroupe : addtroupe):Observable<{}>{
    const formData = new FormData();
    formData.append('name', addtroupe.name)
    formData.append('contact', addtroupe.contact)
    formData.append('phone', addtroupe.phone)
    formData.append('email', addtroupe.email)
    formData.append('person', addtroupe.person)
    formData.append('town', addtroupe.town)
    formData.append('contry', addtroupe.contry)
    formData.append('postalCode', addtroupe.postalCode)
    formData.append('description', addtroupe.description)
    formData.append('price', addtroupe.price)
    formData.append('image', addtroupe.picture);
    
    return this.httpClient.post(`${this.ressourceUrl}add`,formData);
  }


  getAllTroupes():void{
    this.httpClient.get(`${this.ressourceUrl}get`).subscribe(
      (ressources) => {
        this.allAnimation$.next(ressources);
      },
      (error) => {
        this.allAnimation$.next([]);
      }
    )
  }

  modifyTroupe(modifyTroupe : getTroupe){
    const formData = new FormData();
    formData.append('id', modifyTroupe.id)
    formData.append('companieName', modifyTroupe.companieName)
    formData.append('contact', modifyTroupe.contact)
    formData.append('phone', modifyTroupe.phone)
    formData.append('email', modifyTroupe.email)
    formData.append('person', modifyTroupe.person)
    formData.append('ville', modifyTroupe.ville)
    formData.append('pays', modifyTroupe.pays)
    formData.append('postalCode', modifyTroupe.postalCode)
    formData.append('description', modifyTroupe.description)
    formData.append('price', modifyTroupe.price)
    formData.append('activate', modifyTroupe.activate)
    formData.append('image', modifyTroupe.picture);
    return this.httpClient.put(`${this.ressourceUrl}modify/${modifyTroupe.id}`, formData)
    }
    
    getSingleTroupe(troupeId: number){
      return this.httpClient.get(`${this.ressourceUrl}get/`+troupeId).subscribe(
        (ressource) => {
          this.singleAnimation$.next(ressource);
        },
        (error) => {
          this.singleAnimation$.next([]);
        }
      )
    }

    deleteTroupe(id: number){
      return this.httpClient.delete(`${this.ressourceUrl}delete/`+ id)
    }
}
