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
    formData.append('partenaireName', addpartenaire.partenaireName)
    formData.append('contact', addpartenaire.contact)
    formData.append('email', addpartenaire.email)
    formData.append('phone', addpartenaire.phone)
    formData.append('formule', addpartenaire.formule)
    formData.append('montant', addpartenaire.montant)
    formData.append('adresse', addpartenaire.adresse)
    formData.append('reglement', addpartenaire.reglement)
    formData.append('site', addpartenaire.site)
    formData.append('texte',addpartenaire.texte)
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
    formData.append('partenaireName', modifypartenaire.partenaireName)
    formData.append('contact', modifypartenaire.contact)
    formData.append('email', modifypartenaire.email)
    formData.append('phone', modifypartenaire.phone)
    formData.append('formule', modifypartenaire.formule)
    formData.append('montant', modifypartenaire.montant)
    formData.append('adresse', modifypartenaire.adresse)
    formData.append('reglement', modifypartenaire.reglement)
    formData.append('site', modifypartenaire.site)
    formData.append('texte', modifypartenaire.texte)
    formData.append('activate', modifypartenaire.activate)
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
