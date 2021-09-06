export interface IDoor {
  ppk: string;
  name: string;
  sn: string;
  cpk: string;
}

export interface IDoorStore {
  selected?: IDoor | null;
  doors?: IDoor[];
  loading: boolean;
  error: boolean;
  time?: number;
}
