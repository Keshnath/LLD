import { UserModel } from "./user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UserRepository {
  async create(data: CreateUserDto) {
    return UserModel.create(data);
  }

  async findAll() {
    return UserModel.find();
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async update(id: string, data: UpdateUserDto) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}
