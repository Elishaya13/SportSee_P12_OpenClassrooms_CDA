export interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

interface KeyData {
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
