import { Channel } from "amqplib";

class RabbitMQInitializer {
  constructor(
    private readonly channel: Channel
  ) {}

  async initializeExchange(
    exchange: string,
    type: "direct" | "topic" | "fanout" | "headers"
  ) {
    await this.channel.assertExchange(
      exchange,
      type,
      {
        durable: true,
      }
    );
  }

  async deleteExchange(exchange: string) {
    await this.channel.deleteExchange(exchange);
  }

  async deleteQueue(queue: string) {
    await this.channel.deleteQueue(queue);
  }
}

export default RabbitMQInitializer;