export interface ISector {
  percent: number;
  title: string;
  color: string;
}

export interface IChart {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    data: number[];
  }[];
}
