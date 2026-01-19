import express from "express";
import { connectDB } from "./config/database.config";
import { createUserModule } from "./modules/user/user.module";

export async function startServer(port: number) {
  const app = express();
  app.use(express.json());

  await connectDB();

  const { controller } = createUserModule();

  app.post("/users", controller.create);
  app.get("/users", controller.findAll);
  app.get("/users/:id", controller.findById);
  app.put("/users/:id", controller.update);
  app.delete("/users/:id", controller.delete);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
