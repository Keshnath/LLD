import express from "express";
import { connectDB } from "./shared/database";


export async function startServer(port: number) {
  const app = express();

  app.use(express.json());

  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
