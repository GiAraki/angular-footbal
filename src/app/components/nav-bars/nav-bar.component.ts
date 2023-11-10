import { League } from './../../models/standings-response';
import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { BrowserModule } from '@angular/platform-browser';
import { NavBarLinks } from 'src/app/models/nav-bar-links';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports:[MatButtonToggleModule, FormsModule, BrowserModule ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() links: NavBarLinks[] = [];
  @Output() newLinkEvent: EventEmitter<number> = new EventEmitter<number>();

  selectedButton: string = '';

  constructor() { }

  ngOnInit() {
    this.selectedButton =  this.links[0].id;
  }

  changeLink(leagueId: number): void{
    debugger
    this.newLinkEvent.emit(leagueId);
  }


}
