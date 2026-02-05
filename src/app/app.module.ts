import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeAnimationComponent } from './component/Animation/home-animation/home-animation.component';
import { HomeArtisansComponent } from './component/Artisans/home-artisans/home-artisans.component';
import { LoginComponent } from './component/auth/login/login.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./auth-interceptor";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { PasswordComponent } from "./component/auth/password/password.component";
import { HomeCampementComponent } from "./component/campements/home-campement/home-campement.component";
import { AddUserComponent } from "./component/dialog/add/add-user/add-user.component";
import { HomeComponent } from "./component/home/home.component";
import { NavComponent } from "./component/nav/nav.component";
import { HomeMarcheComponent } from "./component/marche/home-marche/home-marche.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HomePartenairesComponent } from "./component/partenaires/home-partenaires/home-partenaires.component";
import { UsersComponent } from './component/users/users.component';
import { HomeTroupesComponent } from './component/troupes/home-troupes/home-troupes.component';
import { AddTroupeComponent } from './component/dialog/add/add-troupe/add-troupe.component';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { CardComponent } from './component/card/card.component';
import { ModifyTroupeComponent } from './component/dialog/modify/modify-troupe/modify-troupe.component';
import { AddCampementComponent } from './component/dialog/add/add-campement/add-campement.component';
import { ModifyCampementComponent } from './component/dialog/modify/modify-campement/modify-campement.component';
import { AddArtisanComponent } from './component/dialog/add/add-artisan/add-artisan.component';
import { ModifyArtisanComponent } from './component/dialog/modify/modify-artisan/modify-artisan.component';
import { AddPartenaireComponent } from './component/dialog/add/add-partenaire/add-partenaire.component';
import { ModifyPartenaireComponent } from './component/dialog/modify/modify-partenaire/modify-partenaire.component';
import { CreateUserComponent } from './component/auth/create-user/create-user.component';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatOption } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { AddAnimationComponent } from './component/dialog/add/add-animation/add-animation.component';
import { ModifyAnimationComponent } from './component/dialog/modify/modify-animation/modify-animation.component';
import { MatTableModule} from '@angular/material/table';
import { AddArchiveComponent } from './component/dialog/add/add-archive/add-archive.component';
import { HomeArchiveComponent } from './component/archive/home-archive/home-archive.component';
import { ModifyArchiveComponent } from './component/dialog/modify/modify-archive/modify-archive.component';
import { ArchiveCardComponent } from './component/archive-card/archive-card.component';
import { UserPermissionsDialogComponent } from './component/dialog/modify/user-permissions-dialog/user-permissions-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HasPermissionDirective } from './directives/has-permission.directive.ts.directive';
import { PhoneFormatPipe } from './shared/phone-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeAnimationComponent,
    HomeArtisansComponent,
    LoginComponent,
    PasswordComponent,
    HomeCampementComponent,
    AddUserComponent,
    HomeComponent,
    HomeMarcheComponent,
    NavComponent,
    UsersComponent,
    HomeTroupesComponent,
    HomePartenairesComponent,
    AddTroupeComponent,
    CardComponent,
    ModifyTroupeComponent,
    AddCampementComponent,
    ModifyCampementComponent,
    AddArtisanComponent,
    ModifyArtisanComponent,
    AddPartenaireComponent,
    ModifyPartenaireComponent,
    CreateUserComponent,
    AddAnimationComponent,
    ModifyAnimationComponent,
    AddArchiveComponent,
    HomeArchiveComponent,
    ModifyArchiveComponent,
    ArchiveCardComponent,
    UserPermissionsDialogComponent,
    HasPermissionDirective,
    PhoneFormatPipe
    ,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSlideToggleModule,
    MatOption,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
    
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync(),
    HttpClient, CardComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
