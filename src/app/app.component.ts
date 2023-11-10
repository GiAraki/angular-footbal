import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavBarLinks } from './models/nav-bar-links';
import { Errors, League, StandingsResponse } from './models/standings-response';
import { HttpParams } from '@angular/common/http';
import { SportService } from './services/sport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  currentYear!: number;
  sessionData!: League;

  navBarLinks: NavBarLinks[] = [
    { id: 'englandSelect', leagueId: 39, name: 'England', isSelected: true },
    { id: 'spainSelect', leagueId: 107, name: 'Spain', isSelected: false },
    { id: 'germanySelect', leagueId: 61, name: 'Germany', isSelected: false },
    { id: 'franceSelect', leagueId: 78, name: 'France', isSelected: false },
    { id: 'italySelect', leagueId: 71, name: 'Italy', isSelected: false },
  ];

  constructor(
    private sportService: SportService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  checkSession(selectedButton: number): void {
    let getSession = sessionStorage.getItem(selectedButton.toString());
    getSession
      ? (this.sessionData = JSON.parse(getSession))
      : this.getData(selectedButton);
  }

  getData(selectedButton: number): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

    const params = new HttpParams()
      .set('league', selectedButton)
      .set('season', this.currentYear);

    this.sportService
      .getStandings(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: StandingsResponse) => {
        //this.sessionData = data.response[0].league;
        sessionStorage.setItem(
          selectedButton.toString(),
          JSON.stringify(data.response[0].league)
        );
      }),
      (err: Errors) => this._snackBar.open(err.report, 'close');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
