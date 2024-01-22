import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { catchError, tap } from 'rxjs/operators';

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

    login(email: string, password: string): Observable<any> {
      const credentials = { email, password };

      return this.http.post<any>(`${this.BASE_URL}/login`, credentials).pipe(
          tap(response => {
            const user = response.credentials;
            if (response.token) {
              this.userStorageService.saveToken(response.token);
              this.userStorageService.saveUser(response);
            }
          }),
          catchError(error => {
            console.error('Login failed:', error);
            return of(false);
          })
        );
    }


    userActive(email: string, password: string): Observable<any>{
      return this.http.post<any>(`${this.BASE_URL}/active`, { email, password });
    }



    checkEmail(email:string):Observable<any>{
      return this.http.post<any>(`${this.BASE_URL}/check-email`,{email});
    }


    resetPassword(email:string, password:string, code:string):Observable<any>{
      const newPassword = { email, password, code };
      return this.http.post<any>(`${this.BASE_URL}/reset-password`,newPassword);
    }




}
