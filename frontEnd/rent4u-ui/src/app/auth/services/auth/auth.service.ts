import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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


   activeAccount(email: string, code: string): Observable<any>{
     return this.http.post<any>(`${this.BASE_URL}/activated`, { email, code });
   }



   checkEmail(email:string):Observable<any>{
     return this.http.post<any>(`${this.BASE_URL}/check-email`,{email});
   }


   resetPassword(email:string, password:string, code:string):Observable<any>{
     const newPassword = { email, password, code };
     return this.http.post<any>(`${this.BASE_URL}/reset-password`,newPassword);
   }


}
