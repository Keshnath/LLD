import { EXCHANGES, QUEUES, ROUTING_KEYS } from "../../constants/app.constants";
import rabbitMq from "../rabbitMq";

class EmailConsumer {
  async consumeUserCreation() {
    const channel = rabbitMq.getChannel();
    channel.assertExchange(EXCHANGES.USER, "topic", {
      durable: true,
    });
    channel.assertQueue(QUEUES.EMAIL, {
      durable: true,
    });
    channel.bindQueue(QUEUES.EMAIL, EXCHANGES.USER, ROUTING_KEYS.USER_CREATED);
    channel.consume(QUEUES.EMAIL, async (msg) => {
      if (!msg) return;

      try {
        const user = JSON.parse(msg.content.toString());
        console.log("🚀 ~ EmailConsumer ~ consumeUserCreation ~ user:", user)

        console.log("Sending welcome email to:", user.email);

        channel.ack(msg);
      } catch (err) {
        console.error(err);

        channel.nack(msg);
      }
    });
  }
}

export default EmailConsumer
