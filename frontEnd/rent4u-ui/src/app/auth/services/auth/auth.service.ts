import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL ="http://localhost:8080/api/v1/auth";

  constructor(private http:HttpClient, private userStorageService: StorageService) { }


    // http://localhost:8080/api/v1/auth/register
    register(registerDTO:any): Observable<any>{
      return this.http.post<any>(`${this.BASE_URL}/register`,registerDTO);
    }

    activeAccount(email: string, code: string): Observable<any>{
      return this.http.post<any>(`${this.BASE_URL}/activated`, { email, code });
    }



}
