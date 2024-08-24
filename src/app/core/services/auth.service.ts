import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}