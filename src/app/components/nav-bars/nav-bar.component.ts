import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { BrowserModule } from '@angular/platform-browser';
import { NavBarLinks } from 'src/app/models/nav-bar-links';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule, BrowserModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() links: NavBarLinks[] = [];
  @Output() newLinkEvent: EventEmitter<number> = new EventEmitter<number>();
  exibirComponente: boolean = true;
  private destroy$: Subject<void> = new Subject<void>();
  selectedButton: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.exibirComponente = !params['id'];
      });

    this.selectedButton = this.links[0].id;
    this.changeLink(this.links[0].leagueId);
  }

  changeLink(leagueId: number): void {
    this.newLinkEvent.emit(leagueId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
