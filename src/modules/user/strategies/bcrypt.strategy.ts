import { PasswordHasherStrategy } from "./password-hasher.strategy";

export class BcryptPasswordHasher
  implements PasswordHasherStrategy
{
  async hash(password: string): Promise<string> {
    // pretend bcrypt logic
    return "bcrypt_" + password;
  }
}
