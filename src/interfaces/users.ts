export interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

export interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export interface UserData {
  id: number;
  userInfos: UserInfos;
  todayScore: number;
  keyData: KeyData;
}

export interface ActivitySessionsProps {
  day: string;
  kilogram: number;
  calories: number;
}
export interface ActivityData {
  userId: number;
  sessions: ActivitySessionsProps[];
}
