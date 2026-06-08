import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import UserPublisher from "../../rabbitMq/publisher/user.publisher";

export class UserService {
  private readonly repo : UserRepository
  private readonly publisher : UserPublisher
  constructor(repo: UserRepository , publsr : UserPublisher) {
    this.repo = repo
    this.publisher = publsr
  }

  

  createUser(data: CreateUserDto) {
     const user : any = this.repo.create(data);
     const { _id , email , } = user
     this.publisher.publishUserCreated({ id: _id, name: "shubham", email });
     return user
  }

  getUsers() {
    return this.repo.findAll();
  }

  getUserById(id: string) {
    return this.repo.findById(id);
  }

  updateUser(id: string, data: UpdateUserDto) {
    return this.repo.update(id, data);
  }

  deleteUser(id: string) {
    return this.repo.delete(id);
  }
}
