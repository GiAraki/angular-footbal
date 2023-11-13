import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FixtureResponse } from 'src/app/models/fixtures';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnChanges {
  @Input() dataSeassion: FixtureResponse[] = [];
  @Input() isLoading: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {

  }
}
