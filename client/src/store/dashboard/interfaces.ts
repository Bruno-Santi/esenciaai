import { Members } from "../../mocks";

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface UserTeams {
  id: number;
  name: string;
  logo?: string;
}

export interface DashBoardState {
  user: User[];
  userTeams: UserTeams[];
  activeTeam: UserTeams | null;
  metricsForToday: string[] | null;
  linesMetrics: string[] | null;
  dataAmount: string[] | null;
  isLoading: boolean;
  membersActiveTeam: Members | [];
}
