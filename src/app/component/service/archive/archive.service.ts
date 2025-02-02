import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddArchive, getArchive } from '../../../interface/archive';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  private ressourceUrl = environment.archiveUrl;
  public allArchive$ = new Subject<any>();
  public singleArchive$ = new Subject<any>();

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllArchives():void{
    this.httpClient.get(`${this.ressourceUrl}get`).subscribe(
      (ressources) => {
        this.allArchive$.next(ressources);
      },
      (error) => {
        this.allArchive$.next([]);
      }
    )
  }

  createArchive(AddArchive : AddArchive):Observable<{}>{
    const formData = new FormData();
    formData.append('image', AddArchive.picture);
    formData.append('years', AddArchive.years)
    formData.append('teaser', AddArchive.teaser)
    console.log(formData);
    
    return this.httpClient.post(`${this.ressourceUrl}add`,formData);
  }

  getSingleArchive(archiveId: number){
    return this.httpClient.get(`${this.ressourceUrl}get/`+archiveId).subscribe(
      (ressource) => {
        this.singleArchive$.next(ressource);
      },
      (error) => {
        this.singleArchive$.next([]);
      }
    )
  }

  modifyArchive(modifyArchive : getArchive){
    const formData = new FormData();
    formData.append('id', modifyArchive.id)
    formData.append('image', modifyArchive.picture);
    formData.append('years', modifyArchive.years)
    formData.append('teaser', modifyArchive.teaser)

    
    return this.httpClient.put(`${this.ressourceUrl}modify/${modifyArchive.id}`, formData)
    }

    deleteArchive(id: number){
      return this.httpClient.delete(`${this.ressourceUrl}delete/`+ id)
    }
}
