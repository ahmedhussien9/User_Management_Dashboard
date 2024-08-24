import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationClientService } from 'src/app/shared/services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private notification: NotificationClientService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Clone the request and add the authorization header if the token exists
        let clonedReq = req;
        if (token) {
            clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // Handle the request and catch errors
        return next.handle(clonedReq).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';

                if (error.status === 403) {
                    errorMessage = 'You do not have permission to perform this action.';
                    this.notification.showError(errorMessage);
                    // this.router.navigate(['/forbidden']);
                } else if (error.status === 401) {
                    // Handle 401 Unauthorized errors
                    errorMessage = 'You are not authorized. Please log in.';
                    this.notification.showError(errorMessage);
                    this.router.navigate(['/login']);
                } else {
                    // Handle other errors
                    errorMessage = `Error: ${error.status}\nMessage: ${error.message}`;
                    this.notification.showError(errorMessage);
                }

                return throwError(errorMessage);
            })
        );
    }
}