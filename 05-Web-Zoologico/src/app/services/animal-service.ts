import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AnimalService {

  constructor(private http: HttpClient) { }

  apiUri = '/api/animals';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      // 13rian: El backend fue programado para esperar el header "access-token"
      // con el token crudo (sin el "Bearer ")
      headers = headers.set('access-token', token);
    }
    return headers;
  }

  getAllAnimalsData(): Observable<any> {
    // Se lo agrego a todos los endpoints por si acaso la API pide token para ver la lista.
    return this.http.get<any>(this.apiUri, { headers: this.getAuthHeaders() });
  }

  newAnimal(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      { headers: this.getAuthHeaders() });
  }

  getOneAnimal(id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUri + '/' + id,
      { headers: this.getAuthHeaders() });
  }

  updateAnimal(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + '/' + id,
      data,
      { headers: this.getAuthHeaders() });
  }

  deleteAnimal(id: any) {
    return this.http.delete<any>(
      this.apiUri + "/" + id,
      { headers: this.getAuthHeaders() });
  }
}
