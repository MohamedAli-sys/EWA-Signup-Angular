import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContacts } from '../models/icontacts';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private readonly env: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  getByPhoneNumber(phoneNumber: string): Observable<IContacts[]> {
    return this.http.get<IContacts[]>(this.env + 'user/getByPhoneNumber', {
      params: { phoneNumber },
    });
  }

  signup(body: IContacts): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.env + 'user/signup', body, {
      observe: 'response',
    });
  }
}
