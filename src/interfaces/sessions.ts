export interface UserSession {
  day: number;
  sessionLength: number;
}

export interface UserSessionsData {
  userId: number;
  sessions: UserSession[];
}
