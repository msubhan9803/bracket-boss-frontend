export type User = {
  id: string;
  name: string;
  email: string;
};

export enum PredefinedRoles {
  superAdmin = 1, 
  clubOwner = 2, 
  player = 3, 
  tournamentOrganizer = 4, 
  leagueOrganizer = 5 
}