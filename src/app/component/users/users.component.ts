import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../dialog/add/add-user/add-user.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { getUserModel } from '../../interface/auth';
import { MatTableDataSource } from '@angular/material/table';
import { UserPermissionsDialogComponent } from '../dialog/modify/user-permissions-dialog/user-permissions-dialog.component';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  private allUserSub: Subscription;
  public users: getUserModel[] = [];
  public errorMsg: string;
  public message: string;

  public displayedColumns: string[] = [
    'Id',
    'Prénom',
    'Nom',
    'Téléphone',
    'Email',
    'Admin',
    'Actions',
  ];

  dataSource: MatTableDataSource<getUserModel>;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  openDialog() {
    this.dialog.open(AddUserComponent);
  }

  ngOnInit(): void {
    this.allUserSub = this.authService.allUsers$.subscribe(
      (users) => {
        this.users = users || [];
        this.dataSource = new MatTableDataSource(this.users);

        if (this.users.length === 0) {
          this.message = 'Aucun utilisateur disponible !';
        }
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );

    this.authService.getAllUser();
  }

  ngOnDestroy(): void {
    if (this.allUserSub) {
      this.allUserSub.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource(this.users);
    }

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openPermissionsDialog(user: getUserModel) {
    const dialogRef = this.dialog.open(UserPermissionsDialogComponent, {
      width: '500px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        // On rafraîchit la liste si les droits ont changé
        this.authService.getAllUser();
      }
    });
  }

  canEdit(): boolean {
  return this.authService.isAdmin(); // admin ONLY
}
}
