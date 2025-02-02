import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPassword, loginModel, userModel } from '../../../interface/auth';
import { environment } from '../../../../environment/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = environment.userUrl;
  public allUsers$ = new Subject<any>();


  constructor(
    private httpClient : HttpClient
  ) { }

  login(loginModel: loginModel){
    return this.httpClient.post(`${this.userUrl}login`, loginModel);
  }
  register(registerModel: userModel){
    return this.httpClient.post(`${this.userUrl}register`, registerModel);
  }

  createPassword(createPassword : createPassword){
    return this.httpClient.put(`${this.userUrl}register/createpassword`, createPassword)
  }

  getAllUser():void{
    this.httpClient.get(`${this.userUrl}get`).subscribe(
      (user) => {
        this.allUsers$.next(user);
      },
      (error) => {
        this.allUsers$.next([]);
      }
    )
  }
}
