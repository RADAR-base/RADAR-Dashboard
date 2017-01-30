export interface MultiTimeSeries {
  vals: TimeValue[];
}

export interface TimeValue {
  date: Date;
  val: number;
  id: string;
}
