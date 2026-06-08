import { EXCHANGES, ROUTING_KEYS } from "../../constants/app.constants";
import rabbitMq from "../rabbitMq";

class UserPublisher {
    async publishUserCreated(user: { id: number; name: string , email  : string }) {
        const channel = rabbitMq.getChannel()
        channel.publish(EXCHANGES.USER , ROUTING_KEYS.USER_CREATED , Buffer.from(JSON.stringify(user)),{
            persistent : true
        })
           console.log(
      `Published event: ${ROUTING_KEYS.USER_CREATED}`
    );
    }
}

export default UserPublisher