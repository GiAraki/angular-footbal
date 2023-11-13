import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableComponent } from 'src/app/components/table/table.component';
import { Standings } from 'src/app/models/standings';
import { SportService } from 'src/app/services/sport.service';

@Component({
  selector: 'app-standings-league-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './standings-league-list.component.html',
  styleUrls: ['./standings-league-list.component.scss']
})
export class StandingsLeagueListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  isLoading: boolean = true;
  dataSeassion:  Standings[] =[];

  constructor(private sportService: SportService) { }

  ngOnInit(): void {
    this.sportService.getSessionDataStandings()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:Standings[] | null ) => {
     if (data) {
       this.isLoading = false;
       this.dataSeassion = data;
     }
     return this.dataSeassion;
   });
 }

 ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}
