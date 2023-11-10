import { AfterViewInit, Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Standings } from 'src/app/models/standings';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [BrowserModule, MatProgressSpinnerModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['', '', 'Name', 'Games', 'W', 'L','D', 'Goal Difference', 'Points'];
  data: Standings[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  constructor() {}

  ngAfterViewInit() {


  }
}
