import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Role } from 'src/app/enums/roles.enum';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ToolBarModule,
    ButtonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  Role = Role;
  user = this.getUserData();
  constructor(private authService: AuthService, private storageService: StorageService) {
    console.log(this.getUserData());
  }

  getUserData() {
    const userData = this.storageService.getItem('user') as any;
    const role = Role[userData.roles];
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      role
    }
    // Use the firstName, lastName, and roles variables as needed
  }

  logout() {
    this.authService.logout();
  }
}
