import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { League, StandingsResponse } from '../models/standings-response';
import { Standings } from '../models/standings';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(private http: HttpClient) {}

  private sessionData: Subject<Standings[] | null> =
    new BehaviorSubject<Standings[] | null>(null);

  setSessionData(sessionData: Standings[]) {
    this.sessionData.next(sessionData);
  }

  getSessionData() {
    return this.sessionData.asObservable();
  }

  getStandings(params: HttpParams): Observable<StandingsResponse> {
    const headers = new HttpHeaders({
      'x-apisports-key': environment.apikey,
    });

    return this.http.get<StandingsResponse>(`${environment.apiUrl}/standings`, {
      params,
      headers,
    });
  }
}
