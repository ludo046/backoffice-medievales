import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { addcampement } from '../../../interface/campement';
import { getTroupe } from '../../../interface/troupe';

@Injectable({
  providedIn: 'root'
})
export class CampementsService {

  private ressourceUrl = environment.campementUrl;
  public allCampement$ = new Subject<any>();
  public singlecampement$ = new Subject<any>();

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllcampements():void{
    this.httpClient.get(`${this.ressourceUrl}get`).subscribe(
      (ressources) => {
        this.allCampement$.next(ressources);
      },
      (error) => {
        this.allCampement$.next([]);
      }
    )
  }

  createCampement(addcampement : addcampement):Observable<{}>{
    const formData = new FormData();
    formData.append('name', addcampement.name)
    formData.append('contact', addcampement.contact)
    formData.append('phone', addcampement.phone)
    formData.append('email', addcampement.email)
    formData.append('person', addcampement.person)
    formData.append('town', addcampement.town)
    formData.append('contry', addcampement.contry)
    formData.append('postalCode', addcampement.postalCode)
    formData.append('description', addcampement.description)
    formData.append('price', addcampement.price)
    formData.append('image', addcampement.picture);
    console.log(formData);
    
    return this.httpClient.post(`${this.ressourceUrl}add`,formData);
  }

  getSingleCampement(campementId: number){
    return this.httpClient.get(`${this.ressourceUrl}get/`+campementId).subscribe(
      (ressource) => {
        this.singlecampement$.next(ressource);
      },
      (error) => {
        this.singlecampement$.next([]);
      }
    )
  }

  modifyCampement(modifycampement){
    const formData = new FormData();
    formData.append('id', modifycampement.id)
    formData.append('companieName', modifycampement.companieName)
    formData.append('contact', modifycampement.contact)
    formData.append('phone', modifycampement.phone)
    formData.append('email', modifycampement.email)
    formData.append('person', modifycampement.person)
    formData.append('ville', modifycampement.ville)
    formData.append('pays', modifycampement.pays)
    formData.append('postalCode', modifycampement.postalCode)
    formData.append('description', modifycampement.description)
    formData.append('price', modifycampement.price)
    formData.append('activate', modifycampement.activate)
    formData.append('image', modifycampement.picture);
    return this.httpClient.put(`${this.ressourceUrl}modify/${modifycampement.id}`, formData)
    }

    deleteCampement(id: number){
      return this.httpClient.delete(`${this.ressourceUrl}delete/`+ id)
    }
}
