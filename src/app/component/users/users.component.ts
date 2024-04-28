import { Component } from '@angular/core';
import { MatDialog,} from '@angular/material/dialog';
import { AddUserComponent } from '../dialog/add/add-user/add-user.component';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  
})
export class UsersComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddUserComponent);
  }
}
