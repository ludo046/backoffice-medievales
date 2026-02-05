import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddArtisans, getArtisans } from '../../../interface/artisan';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  private ressourceUrl = environment.artisanUrl;
  public allArtisan$ = new Subject<any>();
  public singleArtisan$ = new Subject<any>();

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllArtisans():void{
    this.httpClient.get(`${this.ressourceUrl}get`).subscribe(
      (ressources) => {
        this.allArtisan$.next(ressources);
      },
      (error) => {
        this.allArtisan$.next([]);
      }
    )
  }

  createArtisan(addartisan : AddArtisans):Observable<{}>{
    const formData = new FormData();
    formData.append('companieName', addartisan.name)
    formData.append('contact', addartisan.contact)
    formData.append('phone', addartisan.phone)
    formData.append('email', addartisan.email)
    formData.append('town', addartisan.town)
    formData.append('contry', addartisan.contry)
    formData.append('postalCode', addartisan.postalCode)
    formData.append('description', addartisan.description)
    formData.append('price', addartisan.price)
    formData.append('person', addartisan.person)
    formData.append('taille', addartisan.taille)
    formData.append('image', addartisan.picture);
    return this.httpClient.post(`${this.ressourceUrl}add`,formData);
  }

  getSingleArtisan(artisanId: number){
    return this.httpClient.get(`${this.ressourceUrl}get/`+ artisanId).subscribe(
      (ressource) => {
        this.singleArtisan$.next(ressource);
      },
      (error) => {
        this.singleArtisan$.next([]);
      }
    )
  }

  modifyArtisan(modifyartisan : getArtisans){
    const formData = new FormData();
    formData.append('id', modifyartisan.id)
    formData.append('companieName', modifyartisan.companieName)
    formData.append('contact', modifyartisan.contact)
    formData.append('phone', modifyartisan.phone)
    formData.append('email', modifyartisan.email)
    formData.append('ville', modifyartisan.ville)
    formData.append('pays', modifyartisan.pays)
    formData.append('postalCode', modifyartisan.postalCode)
    formData.append('description', modifyartisan.description)
    formData.append('price', modifyartisan.price)
    formData.append('person', modifyartisan.person)
    formData.append('taille', modifyartisan.taille)
    formData.append('activate', modifyartisan.activate)
    formData.append('image', modifyartisan.picture);
    return this.httpClient.put(`${this.ressourceUrl}modify/${modifyartisan.id}`, formData)
    }

    deleteArtisan(id: number){
      return this.httpClient.delete(`${this.ressourceUrl}delete/`+ id)
    }
}
