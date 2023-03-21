export type User = {
  userId: number;
  userEmail: string;
  userLevel: number;
};

export interface AuthState {
  isAuth: boolean;
  currentUser: User | null;
}
