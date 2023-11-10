import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { StandingsResponse } from '../models/standings-response';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  constructor(private http: HttpClient) {}

  getStandings(params: HttpParams): Observable<StandingsResponse> {

    // Define os cabeçalhos
    const headers = new HttpHeaders({
      'x-apisports-key': environment.apikey
    });

    // Faz a solicitação GET com os parâmetros e cabeçalhos
    return this.http.get<StandingsResponse>(`${environment.apiUrl}/standings` , { params, headers });
  }


}
