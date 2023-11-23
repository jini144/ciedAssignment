import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  private baseUrl = 'https://assignment.leadtracker.cied.dev/v1/';

  constructor(private http: HttpClient) {}
  loginUser(username:any, password:any, display:any){
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('device_id', display);
    const headers = new HttpHeaders();

    return this.http.post(this.baseUrl+'accounts/login/', formData, { headers });
  }
  getLeads(token: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'BEARER': token,
      'USER-ID': userId
    });

    return this.http.get<any>(this.baseUrl+'leads/stage/', { headers });
  }

  getLeadsActive(params:any,token: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'BEARER': token,
      'USER-ID': userId
    });

    return this.http.get<any>(this.baseUrl+'leads/', { headers, params });
  }
}
