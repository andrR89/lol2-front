import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://lol2-4vk5.onrender.com';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(name: string, birthDate: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, birthDate, username, password });
  }

  getChampions(token: string, lang: string = 'pt_BR'): Observable<any> {
    return this.http.get(`${this.apiUrl}/champions`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  getChampionDetails(id: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/champions/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
}
