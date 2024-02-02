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



  getCarById(carId:number):Observable<any>{
    return this.http.get<any>(`${this.BASIC_URL}/car/${carId}`, {
      headers: this.createAuthorizationHeader()
    })
  }


  bookCarTemp(carId:number, bookCarDTO:any):Observable<any>{
    return this.http.post<[]>(`${this.BASIC_URL}/car/book/${carId}`, bookCarDTO, {
      headers: this.createAuthorizationHeader()
    })
  }


  getBookingsByUserId():Observable<any>{
    return this.http.get<any>(`${this.BASIC_URL}/car/bookings/${StorageService.getUserId()}`, {
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
