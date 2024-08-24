import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    getUsers(page: number, pageSize: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    updateUser(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.apiUrl}/${id}`);
    }
}