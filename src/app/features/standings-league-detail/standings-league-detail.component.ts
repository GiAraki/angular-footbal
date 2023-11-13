import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TeamCardComponent } from 'src/app/components/team-card/team-card.component';
import { FixtureResponse, Fixtures } from 'src/app/models/fixtures';
import { Errors } from 'src/app/models/standings-response';
import { SportService } from 'src/app/services/sport.service';

@Component({
  selector: 'app-standings-league-detail',
  standalone: true,
  imports: [MatSnackBarModule, HttpClientModule, TeamCardComponent, MatButtonModule],
  templateUrl: './standings-league-detail.component.html',
  styleUrls: ['./standings-league-detail.component.css'],
})
export class StandingsLeagueDetailComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() id: string = '';
  currentYear!: number;
  fixtureData: FixtureResponse[] = [];
  isLoading: boolean = true;

  constructor(
    private sportService: SportService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkSession();
  }

  checkSession(): void {
    let getSession = sessionStorage.getItem(`team-${Number(this.id)}`);
    if (getSession) {
      let session = JSON.parse(getSession);
      this.fixtureData = session;
      this.isLoading = false;
    } else {
      this.getData();
    }
  }

  back(){
    this.router.navigate(['/list']);
  }

  getData(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

    const params = new HttpParams()
      .set('team', this.id)
      .set('season', this.currentYear);

    this.sportService
      .getFixtures(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Fixtures) => {
        let startIndex = Math.max(data.response.length - 10, 0);
        this.fixtureData = data.response.slice(startIndex);
        sessionStorage.setItem(
          `team-${this.id}`,
          JSON.stringify(data.response.slice(startIndex))
        );
        this.isLoading = false;
      }),
      (err: Errors) => {
        this._snackBar.open(err.report, 'close');
        this.isLoading = false;
      };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
