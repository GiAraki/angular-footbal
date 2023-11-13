import { Component, Input, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Standings } from 'src/app/models/standings';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  {
  displayedColumns: string[] = ['Id', 'Icon', 'Name', 'Games', 'W', 'L','D', 'Goal Difference', 'Points'];
  @Input() data: Standings[] = [];
  @Input() isLoadingResults: boolean = true;

  constructor(private router: Router) {}

  teamDetail(standing: Standings): void {
    this.router.navigate(['/list', standing.team.id]);
  }


}
