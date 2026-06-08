import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import UserPublisher from "../../rabbitMq/publisher/user.publisher";

export function createUserModule() {

  // repo -> service -> controller -> wiring

  const repository = new UserRepository(); 
  const publisher = new UserPublisher()
  const service = new UserService(repository ,publisher);
  const controller = new UserController(service);

  return { controller };
}
