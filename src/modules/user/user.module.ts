import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

export function createUserModule() {

  // repo -> service -> controller -> wiring

  const repository = new UserRepository(); 
  const service = new UserService(repository);
  const controller = new UserController(service);

  return { controller };
}
