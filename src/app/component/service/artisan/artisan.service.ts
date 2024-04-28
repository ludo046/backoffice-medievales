import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Addartisan, getArtisans } from '../../../interface/artisan';

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

  createArtisan(addartisan : Addartisan):Observable<{}>{
    const formData = new FormData();
    formData.append('name', addartisan.name)
    formData.append('contact', addartisan.contact)
    formData.append('phone', addartisan.phone)
    formData.append('town', addartisan.town)
    formData.append('contry', addartisan.contry)
    formData.append('postalCode', addartisan.postalCode)
    formData.append('description', addartisan.description)
    formData.append('price', addartisan.price)
    formData.append('taille', addartisan.taille)
    formData.append('image', addartisan.picture);
    console.log(formData);
    
    return this.httpClient.post(`${this.ressourceUrl}add`,formData);
  }

  getSingleArtisan(artisanId: number){
    return this.httpClient.get(`${this.ressourceUrl}get/`+artisanId).subscribe(
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
    formData.append('name', modifyartisan.name)
    formData.append('contact', modifyartisan.contact)
    formData.append('phone', modifyartisan.phone)
    formData.append('town', modifyartisan.town)
    formData.append('contry', modifyartisan.contry)
    formData.append('postalCode', modifyartisan.postalCode)
    formData.append('description', modifyartisan.description)
    formData.append('price', modifyartisan.price)
    formData.append('taille', modifyartisan.taille)
    formData.append('image', modifyartisan.picture);
    return this.httpClient.put(`${this.ressourceUrl}modify/${modifyartisan.id}`, formData)
    }

    deleteArtisan(id: number){
      return this.httpClient.delete(`${this.ressourceUrl}delete/`+ id)
    }
}
