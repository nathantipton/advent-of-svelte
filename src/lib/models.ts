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