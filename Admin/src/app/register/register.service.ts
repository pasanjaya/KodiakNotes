import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Registration } from './register/register.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  addAdmin(admin: Registration): Observable<any> {
    return this.http.post<any>("http://localhost:8080/saveAdmin", admin);

 }

  authenticateAdmin(admin: Registration): Observable<any>{
    return this.http.post<any>("http://localhost:8080//authenticateAdmin",admin);

 }
}


