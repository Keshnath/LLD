export interface PasswordHasherStrategy {
  hash(password: string): Promise<string>;
}
