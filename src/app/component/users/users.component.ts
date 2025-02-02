import { Component } from '@angular/core';
import { MatDialog,} from '@angular/material/dialog';
import { AddUserComponent } from '../dialog/add/add-user/add-user.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { getUserModel } from '../../interface/auth';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  
})
export class UsersComponent {

  private allUser: Subscription;
  public users : getUserModel[];
  public createCard = [];
  public errorMsg : string;
  public message : string;
  public displayedColumns: string[] = ['Id', 'Prénom', 'Nom', 'Téléphone', 'Email', 'Admin'];
  dataSource

  constructor(public dialog: MatDialog,
              private authService : AuthService
  ) {}

  openDialog() {
    this.dialog.open(AddUserComponent);
  }
  ngOnInit(): void {
    this.allUser = this.authService.allUsers$.subscribe(
      (users) => {
        console.log(users);
        
        this.users = users
        for(let i = 0; i < this.users.length; i++){
         const card = {
           id : this.users[i].id,
           firstName : this.users[i].firstname,
           lastName : this.users[i].lastname,
           email : this.users[i].email,
           phone : this.users[i].phone,
           isAdmin: this.users[i].isAdmin
         }
         this.createCard.push(card)
         this.dataSource = new MatTableDataSource(this.users);
        }
      },
      (error) => { 
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.authService.getAllUser()
    if(this.createCard.length === 0){
      this.message = 'Aucun utilisateur disponible !'
    }

    
  }

  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource(this.users);
    console.log(this.dataSource);
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    
  }
}
