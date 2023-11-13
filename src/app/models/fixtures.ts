import { Errors } from './standings-response';

export interface Fixtures {
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
  response: FixtureResponse[];
}

export interface FixtureResponse {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
}

export interface Fixture {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number;
    second: number;
  };
  venue: {
    id: null | number;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number;
  };
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: null | string;
  season: number;
  round: string;
}

export interface Teams {
  home: Game;
  away: Game;
}

export interface Game {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface Goals {
  home: number;
  away: number;
}

export interface Score {
  halftime: {
    home: number;
    away: number;
  };
  fulltime: {
    home: number;
    away: number;
  };
  extratime: {
    home: null | number;
    away: null | number;
  };
  penalty: {
    home: null | number;
    away: null | number;
  };
}
