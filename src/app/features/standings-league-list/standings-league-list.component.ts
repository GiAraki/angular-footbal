import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/components/table/table.component';
import { Standings } from 'src/app/models/standings';
import { League } from 'src/app/models/standings-response';
import { SportService } from 'src/app/services/sport.service';

@Component({
  selector: 'app-standings-league-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './standings-league-list.component.html',
  styleUrls: ['./standings-league-list.component.scss']
})
export class StandingsLeagueListComponent implements OnInit {
  isLoading: boolean = true;
  dataSeassion:  Standings[] =[];

  constructor(private sportService: SportService) { }

  ngOnInit(): void {
    this.sportService.getSessionData().subscribe((data:Standings[] | null ) => {
     if (data) {
       this.isLoading = false;
       this.dataSeassion = data;
     }
     return this.dataSeassion;
   });
 }

}
