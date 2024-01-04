export interface ActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

export interface ActivityData {
  userId: number;
  sessions: ActivitySession[];
}
