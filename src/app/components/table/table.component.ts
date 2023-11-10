import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, BrowserModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

}
