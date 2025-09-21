export interface Activity {
  time: string;
  description: string;
}

export interface DayPlan {
  day: number;
  location: string;
  activities: Activity[];
}
