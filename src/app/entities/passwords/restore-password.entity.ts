export interface RestorePasswordEntity {
  isUniquePassword: boolean;
  password: string;
  ip?: string;
  userName?: string;
}
