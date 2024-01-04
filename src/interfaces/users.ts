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
  score?: number;
  todayScore?: number;
  keyData: KeyData;
}

export interface User {
  id: number;
  userInfos: UserInfos;
  todayScore: number;
  keyData: KeyData;
}
