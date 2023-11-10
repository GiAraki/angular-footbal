import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavBarLinks } from './models/nav-bar-links';
import { Errors, StandingsResponse } from './models/standings-response';
import { HttpParams } from '@angular/common/http';
import { SportService } from './services/sport.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private sportService: SportService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  navBarLinks: NavBarLinks[] = [
    { id: 'englandSelect', leagueId: 39, name: 'England', isSelected: true },
    { id: 'spainSelect', leagueId: 107, name: 'Spain', isSelected: false },
    { id: 'germanySelect', leagueId: 61, name: 'Germany', isSelected: false },
    { id: 'franceSelect', leagueId: 78, name: 'France', isSelected: false },
    { id: 'italySelect', leagueId: 71, name: 'Italy', isSelected: false },
  ];

  getData(selectedButton: Event): void {
    let selectedValue = selectedButton as unknown as string;

    const params = new HttpParams()
      .set('param1', 'value1')
      .set('param2', 'value2');

    this.sportService
      .getStandings(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: StandingsResponse) => {
        sessionStorage.setItem(
          selectedValue,
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
