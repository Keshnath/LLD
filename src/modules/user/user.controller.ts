import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  };

  findAll = async (_: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.json(users);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const user = await this.userService.getUserById(id);
    res.json(user);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const user = await this.userService.updateUser(id, req.body);
    res.json(user);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await this.userService.deleteUser(id);
    res.status(204).send();
  };
}
