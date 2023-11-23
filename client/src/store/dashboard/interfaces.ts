export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
export interface UserTeams {
  creatorId: number;
  id: number;
  name: string;
  logo?: string;
}

export interface DashBoardState {
  user: User[];
  userTeams: UserTeams[];
  activeTeam: UserTeams[];
}
