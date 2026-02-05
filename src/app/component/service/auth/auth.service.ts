// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { createPassword, loginModel, userModel } from '../../../interface/auth';
// import { environment } from '../../../../environment/environment';
// import { BehaviorSubject, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private userUrl = environment.userUrl;
//   public allUsers$ = new Subject<any>();


//   constructor(
//     private httpClient : HttpClient
//   ) { }

//   login(loginModel: loginModel){
//     return this.httpClient.post(`${this.userUrl}login`, loginModel);
//   }
//   register(registerModel: userModel){
//     return this.httpClient.post(`${this.userUrl}register`, registerModel);
//   }

//   createPassword(createPassword : createPassword){
//     return this.httpClient.put(`${this.userUrl}register/createpassword`, createPassword)
//   }

//   getAllUser():void{
//     this.httpClient.get(`${this.userUrl}get`).subscribe(
//       (user) => {
//         this.allUsers$.next(user);
//       },
//       (error) => {
//         this.allUsers$.next([]);
//       }
//     )
//   }

// updateUserPermissions(userId: number, permissions: any) {
//   return this.httpClient.put<{ message: string; user: any }>(
//     `${this.userUrl}permissions/${userId}`,
//     permissions
//   );
// }

// getCurrentUser(): any {
//   try {
//     const storedUser =
//       sessionStorage.getItem('session') || localStorage.getItem('session');

//     if (!storedUser) {
//       return null;
//     }

//     return JSON.parse(storedUser);
//   } catch {
//     return null;
//   }
// }

// getCurrentUserPermissions() {
//   const storedUser =
//     sessionStorage.getItem('session') || localStorage.getItem('session');

//   if (!storedUser) {
//     return null;
//   }

//   return JSON.parse(storedUser);
// }


// /**
//  * Peut modifier une section ? (troupe, campement, artisan, etc.)
//  * @param section nom du flag : 'troupe', 'campement', 'artisan', 'animation', 'marche', 'partenaire'
//  */
// canEdit(section: string): boolean {
//   const user = this.getCurrentUser();
//   if (!user) return false;
//   if (user.isAdmin) return true;
//   return !!user[section];
// }

// /**
//  * Est admin ?
//  */
// isAdmin(): boolean {
//   const user = this.getCurrentUser();
//   return !!user?.isAdmin;
// }


// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPassword, loginModel, userModel } from '../../../interface/auth';
import { environment } from '../../../../environment/environment';
import { BehaviorSubject, Subject, tap } from 'rxjs';

type PermKey =
  | 'isAdmin'
  | 'troupe'
  | 'campement'
  | 'artisan'
  | 'animation'
  | 'marche'
  | 'partenaire';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = environment.userUrl;

  public allUsers$ = new Subject<any>();

  // ✅ réactif
  private _currentUser$ = new BehaviorSubject<any>(null);
  public currentUser$ = this._currentUser$.asObservable();

  constructor(private httpClient: HttpClient) {
    // ✅ init au démarrage
    this.syncFromStorage();

    // ✅ si la session change dans un autre onglet / ou ailleurs
    window.addEventListener('storage', (e) => {
      if (e.key === 'session') this.syncFromStorage();
    });
  }

  // ---------- API ----------
  login(payload: loginModel) {
    return this.httpClient.post<any>(`${this.userUrl}login`, payload).pipe(
      tap((res) => {
        // IMPORTANT: on stocke TOUT l'objet (userId + flags + token)
        if (res) this.setSession(res, this.isStoredInLocalStorage() || true);
      })
    );
  }

  register(payload: userModel) {
    return this.httpClient.post(`${this.userUrl}register`, payload);
  }

  createPassword(payload: createPassword) {
    return this.httpClient.put(`${this.userUrl}register/createpassword`, payload);
  }

  getAllUser(): void {
    this.httpClient.get(`${this.userUrl}get`).subscribe(
      (users) => this.allUsers$.next(users),
      () => this.allUsers$.next([])
    );
  }

  updateUserPermissions(userId: number, permissions: any) {
    return this.httpClient.put<{ message: string; user: any }>(
      `${this.userUrl}permissions/${userId}`,
      permissions
    ).pipe(
      tap((res) => {
        // ✅ si tu modifies ton propre compte, on met à jour la session
        const me = this.getCurrentUser();
        const myId = me?.userId ?? me?.id;
        if (me && myId === userId && res?.user) {
          this.setSession({ ...me, ...res.user }, this.isStoredInLocalStorage());
        }
      })
    );
  }

  // ---------- SESSION ----------
  /** Compat: continue de lire storage comme avant */
  getCurrentUser(): any {
    return this._currentUser$.value;
  }

  /** si tu as du vieux code qui appelle ça */
  getCurrentUserPermissions(): any {
    return this.getCurrentUser();
  }

  /** À appeler si TU écris encore dans localStorage dans un composant */
  syncFromStorage(): void {
    const u = this.readSession();
    this._currentUser$.next(u);
  }

  /** La bonne méthode pour écrire la session */
  setSession(sessionObj: any, useLocalStorage = true): void {
    const normalized = this.normalizeUser(sessionObj);

    if (useLocalStorage) {
      localStorage.setItem('session', JSON.stringify(normalized));
      sessionStorage.removeItem('session');
    } else {
      sessionStorage.setItem('session', JSON.stringify(normalized));
      localStorage.removeItem('session');
    }

    // ✅ notifie immédiatement la directive
    this._currentUser$.next(normalized);
  }

  clearSession(): void {
    localStorage.removeItem('session');
    sessionStorage.removeItem('session');
    this._currentUser$.next(null);
  }

  // ---------- PERMS ----------
  canEdit(section: PermKey | string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    if (this.toBool(user.isAdmin)) return true;
    return this.toBool(user[section as PermKey]);
  }

  isAdmin(): boolean {
    return this.toBool(this.getCurrentUser()?.isAdmin);
  }

  // ---------- Helpers ----------
  private readSession(): any {
    try {
      const stored = sessionStorage.getItem('session') || localStorage.getItem('session');
      if (!stored) return null;
      return this.normalizeUser(JSON.parse(stored));
    } catch {
      return null;
    }
  }

  private isStoredInLocalStorage(): boolean {
    return !!localStorage.getItem('session');
  }

  private toBool(v: any): boolean {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v === 1;
    if (typeof v === 'string') {
      const s = v.trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'on' || s === 'yes';
    }
    return false;
  }

  private normalizeUser(u: any) {
    if (!u) return u;
    const copy = { ...u };

    const keys: PermKey[] = [
      'isAdmin','troupe','campement','artisan','animation','marche','partenaire'
    ];

    for (const k of keys) {
      if (k in copy) copy[k] = this.toBool(copy[k]);
    }
    return copy;
  }
}
