import { Channel, ChannelModel, connect } from "amqplib";

class RabbitMQ {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  constructor(
    private readonly url: string =
      process.env.RABBITMQ_URL || "amqp://localhost:5672"
  ) {}

  async connect(): Promise<void> {
    try {
      this.connection = await connect(this.url);

      this.channel = await this.connection.createChannel();

      console.log("✅ Connected to RabbitMQ");

      this.connection.on("close", () => {
        console.log("RabbitMQ connection closed");
      });

      this.connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
      });
    } catch (err) {
      console.error("Failed to connect to RabbitMQ", err);
      throw err;
    }
  }

  getChannel(): Channel {
    if (!this.channel) {
      throw new Error(
        "RabbitMQ channel not initialized. Call connect() first."
      );
    }

    return this.channel;
  }

  getConnection(): ChannelModel {
    if (!this.connection) {
      throw new Error(
        "RabbitMQ connection not initialized. Call connect() first."
      );
    }

    return this.connection;
  }

  async close(): Promise<void> {
    try {
      await this.channel?.close();
      await this.connection?.close();

      console.log("RabbitMQ connection closed");
    } catch (err) {
      console.error("Error while closing RabbitMQ", err);
    }
  }
}

export default new RabbitMQ();