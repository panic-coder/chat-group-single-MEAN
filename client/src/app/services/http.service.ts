import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/'

  postRequest(url, data ) {
    return this.http.post(this.baseUrl + url, data);
  }
}
