import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {Car} from "../models/car.model";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(
    private http: HttpClient
  ) { }

  create(tenant: Car){
    return this.http.post<Car>(`${environment.apiUrl}/cars`, tenant);
  }

  update(id: string, tenant: Partial<Car>){
    return this.http.patch<void>(`${environment.apiUrl}/cars/${id}`, tenant);
  }

  delete(id: string){
    return this.http.delete<void>(`${environment.apiUrl}/cars/${id}`);
  }

  getAll(){
    return this.http.get<Car[]>(`${environment.apiUrl}/cars`);
  }
}
