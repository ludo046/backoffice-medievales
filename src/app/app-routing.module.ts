import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './component/auth/password/password.component';
import { UsersComponent } from './component/users/users.component';
import { HomePartenairesComponent } from './component/partenaires/home-partenaires/home-partenaires.component';
import { HomeMarcheComponent } from './component/marche/home-marche/home-marche.component';
import { HomeAnimationComponent } from './component/Animation/home-animation/home-animation.component';
import { HomeArtisansComponent } from './component/Artisans/home-artisans/home-artisans.component';
import { HomeCampementComponent } from './component/campements/home-campement/home-campement.component';
import { HomeTroupesComponent } from './component/troupes/home-troupes/home-troupes.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/auth/login/login.component';

const routes: Routes = [
  {path : 'createpassword', component : PasswordComponent},
  {path : 'users', component : UsersComponent},
  {path : 'homePartenaires', component : HomePartenairesComponent},
  {path : 'homeMarche', component : HomeMarcheComponent},
  {path : 'homeAnimations', component : HomeAnimationComponent},
  {path : 'homeArtisans', component : HomeArtisansComponent},
  {path : 'homeCampements', component : HomeCampementComponent},
  {path : 'homeTroupes', component : HomeTroupesComponent},
  {path : 'home', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : '', component : LoginComponent},
  {path : '**', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
