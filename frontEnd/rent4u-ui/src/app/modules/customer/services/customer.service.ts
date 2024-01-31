import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASIC_URL = "http://localhost:8080/api/customer";

  constructor(private http:HttpClient) { }

  getAllCars():Observable<any>{
    return this.http.get<any>(`${this.BASIC_URL}/cars`, {
      headers: this.createAuthorizationHeader()
    })
  }


  searchCar(searchCarDTO:any):Observable<any>{
    return this.http.post(`${this.BASIC_URL}/car/search`, searchCarDTO, {
      headers: this.createAuthorizationHeader()
    })
  }



  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }


}
