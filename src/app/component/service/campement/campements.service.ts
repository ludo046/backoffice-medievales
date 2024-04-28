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

  modifyCampement(modifycampement : getTroupe){
    const formData = new FormData();
    formData.append('id', modifycampement.id)
    formData.append('name', modifycampement.name)
    formData.append('contact', modifycampement.contact)
    formData.append('phone', modifycampement.phone)
    formData.append('town', modifycampement.town)
    formData.append('contry', modifycampement.contry)
    formData.append('postalCode', modifycampement.postalCode)
    formData.append('description', modifycampement.description)
    formData.append('price', modifycampement.price)
    formData.append('image', modifycampement.picture);
    return this.httpClient.put(`${this.ressourceUrl}modify/${modifycampement.id}`, formData)
    }

    deleteCampement(id: number){
      return this.httpClient.delete(`${this.ressourceUrl}delete/`+ id)
    }
}
