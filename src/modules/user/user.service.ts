import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UserService {
  private readonly repo : UserRepository
  constructor(repo: UserRepository) {
    this.repo = repo
  }

  

  createUser(data: CreateUserDto) {
    return this.repo.create(data);
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
