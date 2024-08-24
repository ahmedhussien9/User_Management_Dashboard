import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterConfigurationFeature } from '@angular/router';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { Title } from '@angular/platform-browser';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { NotificationClientService } from 'src/app/shared/services/notification.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NotificationModule,
    FormsModule,
    InputsModule,
    ButtonsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private notificationClientService: NotificationClientService,
    private storageService: StorageService,
    private router: Router, private titleService: Title
  ) {
    this.titleService.setTitle('User Management | Login');
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        this.storageService.setItem('token', response.data.access_token);
        this.storageService.setIObjtem('user',response.data.payload)
        this.router.navigate(['/dashboard/users']);
        this.notificationClientService.showSuccess(response.message);
      },
      (error) => {
        console.error('Login failed', error);
        this.notificationClientService.showError(error.error.message);

      }
    );
  }
}
