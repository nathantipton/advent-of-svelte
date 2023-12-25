
// Home
export interface AdventDay {
  day: number;
  title: string;
  description: string;
  link: string;
  icon: string;
  status: AdventDayStatus;
}

export type AdventDayStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";

export type AdventCalendar = AdventDay[];

// Day 1
export interface ListItem {
  name: string;
  tally: number;
}

// Day 3
export interface Present {
  id: number;
  name: string;
  weight: number;
}

// Day 4
export interface HeartRate {
  heartRate: number;
}


// Day 5
export type TaskType = "CREATED_TOY" | "WRAPPED_PRESENT";

export interface Task {
  elf: string;
  task: TaskType;
  minutesTaken: number;
  date: string;
}

export interface Day5DTO {
  tasks: Task[];
  lastUpdated: string;
}

export interface ElfAnalytics {
  aggregations: Aggregations,
  mostCreatedToysLeaderboard: MostCreatedToysLeaderboard,
  mostWrappedPresentsLeaderboard: MostWrappedPresentsLeaderboard,
  fastestCreatedToyLeaderboard: FastestCreatedToyLeaderboard,
  fastestWrappedPresentLeaderboard: FastestWrappedPresentLeaderboard,
  elfKpis: ElfKpis,
}

export interface DashboardModel {
  lastUpdated: string;
  tasks: Task[];
  analytics: ElfAnalytics;
}

export interface Aggregations {
  totalCreatedToys: number;
  totalWrappedPresents: number;
  totalMinutes: number;
  totalTasks: number;
  averageMinutesPerToy: number;
  averageMinutesPerPresent: number;
  averageMinutesPerTask: number;
}

export type LeaderboardEntry = { elf: string, value: number };
export type Leaderboard = LeaderboardEntry[];

export type MostCreatedToysLeaderboard = LeaderboardEntry[];
export type MostWrappedPresentsLeaderboard = LeaderboardEntry[];
export type FastestCreatedToyLeaderboard = LeaderboardEntry[];
export type FastestWrappedPresentLeaderboard = LeaderboardEntry[];

export type ElfKpis = { [key: string]: Aggregations };

export const EMPTY_ELF_ANALYTICS: ElfAnalytics = {
  aggregations: {
    totalTasks: 0,
    totalMinutes: 0,
    totalCreatedToys: 0,
    totalWrappedPresents: 0,
    averageMinutesPerToy: 0,
    averageMinutesPerPresent: 0,
    averageMinutesPerTask: 0
  },
  mostCreatedToysLeaderboard: [],
  mostWrappedPresentsLeaderboard: [],
  fastestCreatedToyLeaderboard: [],
  fastestWrappedPresentLeaderboard: [],
  elfKpis: {}
}


// Day 6
export interface Song {
  id: number;
  title: string;
  artist: string;
  youtubeId: string;
  targetBpm: number;
  startTime: number;
}

export const SONG_CHOICES: Song[] = [
  {
    id: 1,
    title: "All I Want for Christmas Is You",
    artist: "Mariah Carey",
    youtubeId: "aAkMkVFwAoo",
    targetBpm: 150,
    startTime: 54
  },
  {
    id: 2,
    title: "Last Christmas",
    artist: "Wham!",
    youtubeId: "E8gmARGvPlI",
    targetBpm: 108,
    startTime: 0
  },
  {
    id: 3,
    title: "Jingle Bell Rock",
    artist: "Bobby Helms",
    youtubeId: "Gqwk7uR1BI8",
    targetBpm: 120,
    startTime: 0
  },
  {
    id: 4,
    title: "It's Beginning to Look a Lot Like Christmas",
    artist: "Michael Bublé",
    youtubeId: "0bhsXykXxfg",
    targetBpm: 93,
    startTime: 35
  },
  {
    id: 5,
    title: "Feliz Navidad",
    artist: "José Feliciano",
    youtubeId: "0UVUW11FENs",
    targetBpm: 148,
    startTime: 20
  },
  {
    id: 6,
    title: "Santa Tell Me",
    artist: "Ariana Grande",
    youtubeId: "nlR0MkrRklg",
    targetBpm: 96,
    startTime: 10
  },
  {
    id: 7,
    title: "Santa Claus Is Coming to Town",
    artist: "Jackson 5",
    youtubeId: "HhiUOCo8LYQ",
    targetBpm: 140,
    startTime: 30
  }
]

// Day 8
export type GameBoard = Tile[];

export interface Tile {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameOptions {
  size: GameSize;
  isTimed: boolean;
}

export enum GameSize {
  Small = 12,
  Medium = 24,
  Large = 36,
  Huge = 48
}

export const DEFAULT_GAME_OPTIONS: GameOptions = {
  size: GameSize.Medium,
  isTimed: false
}

export type GameState = "UNINITIALIZED" | "READY" | "IN_PROGRESS" | "COMPLETED";

// Day 11
export interface ElfNamesDTO {
  firstNames: string[];
  lastNames: string[];
}
