import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationClientService {

  constructor(private notificationService: NotificationService) { }

  showSuccess(content: string) {
    this.notificationService.show({
      content: content,
      cssClass: 'k-success',
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'success', icon: true },
      closable: true,
    });
  }

  showError(content: string) {
    this.notificationService.show({
      content: content,
      cssClass: 'k-error',
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'error', icon: true },
      closable: true,
    });
  }
}
