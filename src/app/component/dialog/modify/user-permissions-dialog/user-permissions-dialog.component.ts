import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getUserModel } from '../../../../interface/auth';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-user-permissions-dialog',
  standalone: false,
  templateUrl: './user-permissions-dialog.component.html',
  styleUrls: ['./user-permissions-dialog.component.scss'],
})
export class UserPermissionsDialogComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserPermissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: getUserModel }
  ) {}

  ngOnInit(): void {
    const u = this.data.user;

    this.form = this.fb.group({
      isAdmin: [u.isAdmin],
      troupe: [u.troupe],
      campement: [u.campement],
      artisan: [u.artisan],
      animation: [u.animation],
      marche: [u.marche],
      partenaire: [u.partenaire],
    });
  }

  save(): void {
    if (!this.data.user?.id) {
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const payload = this.form.value;

    this.authService.updateUserPermissions(this.data.user.id, payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMsg = 'Droits mis à jour';
        // On ferme en indiquant au parent que ça a été modifié
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.error || 'Erreur lors de la mise à jour des droits';
      },
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
