import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { Title } from '@angular/platform-browser';
import { NotificationClientService } from 'src/app/shared/services/notification.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Role } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UserDialogComponent,
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
/**
 * Represents the User Management Component.
 * This component is responsible for managing users, including creating, editing, and deleting users.
 * It also displays a grid of users and allows pagination.
 */
export class UserManagementComponent implements OnInit {
  Role = Role; // Expose the Role enum to the template
  // Grid data for users
  users: GridDataResult = { data: [], total: 0 };
  readonly pageSize = 20;
  skip = 0;
  isDialogOpen = false;
  selectedUser: User = {} as User;
  password: string = '';
  confirmPassword: string = '';
  roleMapping: { [key: number]: string } = {
    1: 'Admin',
    2: 'Manager',
    3: 'Editor'
  };

  constructor(
    private userService: UserService,
    private titleService: Title,
    private notificationClientService: NotificationClientService,
    private cdr: ChangeDetectorRef
  ) {
    this.titleService.setTitle('User Management | User Page');
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Get the role name based on the role ID
  getRoleName(roleId: number): string {
    return this.roleMapping[roleId] || 'Unknown';
  }

  // Load users from the server
  loadUsers(): void {
    const page = this.getPageNumber();
    this.userService.getUsers(page, this.pageSize)
      .pipe(
        catchError(error => {
          this.notificationClientService.showError('Failed to load users');
          return of({ data: [], total: 0 }); // Return an empty dataset in case of error
        })
      )
      .subscribe(response => {
        this.users.data = response.data || []
        this.cdr.detectChanges(); // Manually trigger change detection
      });
  }

  // Open the user dialog for creating or editing a user
  openDialog(user: User | null): void {
    this.selectedUser = user ? { ...user } : {} as User;
    this.resetPasswordFields();
    this.isDialogOpen = true;
  }

  // Save the user data
  saveUser(user: User): void {
    const userData = user;
    if (this.selectedUser._id) {
      this.updateUser(userData);
    } else {
      this.createUser(userData);
    }
  }

  // Delete a user
  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id)
        .pipe(
          catchError(error => {
            this.notificationClientService.showError('Failed to delete user');
            return of(null);
          })
        )
        .subscribe(() => {
          this.notificationClientService.showSuccess('User Deleted Successfully!');
          this.loadUsers();
        });
    }
  }

  // Close the user dialog
  closeDialog(): void {
    this.isDialogOpen = false;
  }

  // Handle page change event
  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadUsers();
  }

  private getPageNumber(): number {
    return this.skip / this.pageSize + 1;
  }

  private resetPasswordFields(): void {
    this.password = '';
    this.confirmPassword = '';
  }

  private updateUser(userData: User): void {
    this.userService.updateUser(this.selectedUser._id, userData)
      .pipe(
        catchError(error => {
          this.notificationClientService.showError('Failed to update user');
          return of(null);
        })
      )
      .subscribe(() => {
        this.notificationClientService.showSuccess('User Updated Successfully!');
        this.loadUsers();
        this.closeDialog();
      });
  }

  private createUser(userData: User): void {
    this.userService.createUser(userData)
      .pipe(
        catchError(error => {
          this.notificationClientService.showError('Failed to create user');
          return of(null);
        })
      )
      .subscribe(() => {
        this.notificationClientService.showSuccess('User Created Successfully!');
        this.loadUsers();
        this.closeDialog();
      });
  }
}
