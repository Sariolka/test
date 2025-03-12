export interface Sector {
  percent: number;
  title: string;
  color: string;
}

export interface Chart {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    data: number[];
  }[];
}
