import express from "express";
import { connectDB } from "./config/database.config";
import { createUserModule } from "./modules/user/user.module";
import { connectRedis } from "./redis/redis";
import { rateLimiter, slidingWindowRateLimiter } from "./redis/rateLimiter";
import  RabbitMQ  from "./rabbitMq/rabbitMq";
import RabbitMQInitializer from "./rabbitMq/rabbitmq.bootstrap";
import { EXCHANGES, QUEUES } from "./constants/app.constants";
import EmailConsumer from "./rabbitMq/consumer/email.consumer";
export async function startServer(port: number) {
  const app = express();
  app.use(express.json());

  await connectDB();
  await connectRedis();
  await RabbitMQ.connect();
  const channel = RabbitMQ.getChannel();
  const initializer = new RabbitMQInitializer(channel);
  await initializer.initializeExchange(EXCHANGES.USER ,"topic");
  const { controller } = createUserModule();

  app.post("/users", controller.create);
  app.get("/users",slidingWindowRateLimiter ,controller.findAll);
  app.get("/users/:id", controller.findById);
  app.put("/users/:id", controller.update);
  app.delete("/users/:id", controller.delete);

  const consumer = new EmailConsumer();
  await consumer.consumeUserCreation();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
