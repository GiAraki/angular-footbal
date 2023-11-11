import { Standings } from './standings';

export interface StandingsResponse {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: Errors;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: League[];
}

export interface League {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: Standings[][];
  };
}

export interface Errors {
  time: Date;
  bug: string;
  report: string;
}
