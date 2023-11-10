export interface Standings {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: GamesNumbers;
  home: GamesNumbers;
  away: GamesNumbers;
  update: Date;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface GamesNumbers {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
}
