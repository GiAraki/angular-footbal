import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { StandingsResponse } from '../models/standings-response';
import { Standings } from '../models/standings';
import { FixtureResponse, Fixtures } from '../models/fixtures';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(private http: HttpClient) {}

  private sessionDataStandings: Subject<Standings[] | null> =
    new BehaviorSubject<Standings[] | null>(null);

  private sessionDataFixtures: Subject<FixtureResponse[] | null> = new BehaviorSubject<
  FixtureResponse[] | null
  >(null);

  setSessionDataStandings(sessionData: Standings[]) {
    this.sessionDataStandings.next(sessionData);
  }

  getSessionDataStandings() {
    return this.sessionDataStandings.asObservable();
  }

  setSessionDataFixtures(sessionData: FixtureResponse[]) {
    this.sessionDataFixtures.next(sessionData);
  }

  getSessionDataFixtures() {
    return this.sessionDataFixtures.asObservable();
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

  getFixtures(params: HttpParams): Observable<Fixtures> {
    const headers = new HttpHeaders({
      'x-apisports-key': environment.apikey,
    });

    return this.http.get<Fixtures>(`${environment.apiUrl}/fixtures`, {
      params,
      headers,
    });
  }
}
