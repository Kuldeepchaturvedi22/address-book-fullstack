import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
  id: number;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  phone: number;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:8080/address';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`);
  }

  addAddress(address: {
    id: number;
    fullName: string;
    phone: number;
    address: string;
    city: string;
    state: string;
    zip: number
    }): Observable<string> {
    return this.http.post<string>(this.apiUrl, address);
  }

  updateAddress(id: string, address: Address): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
