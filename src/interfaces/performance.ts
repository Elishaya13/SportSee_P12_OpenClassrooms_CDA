export interface Kind {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
}
export interface PerformanceValues {
  value: number;
  kind: number;
}

export interface PerformanceData {
  userId: number;
  kind: Kind;
  data: PerformanceValues[];
}
