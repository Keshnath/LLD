interface OrderState {
  pay(order: Order): void;
  ship(order: Order): void;
  deliver(order: Order): void;
}


class CreatedState implements OrderState {
  pay(order: Order): void {
    console.log("Payment successful");
    order.setState(new PaidState());
  }

  ship(): void {
    throw new Error("Cannot ship before payment");
  }

  deliver(): void {
    throw new Error("Cannot deliver before shipping");
  }
}

class PaidState implements OrderState {
  pay(): void {
    throw new Error("Already paid");
  }

  ship(order: Order): void {
    console.log("Order shipped");
    order.setState(new ShippedState());
  }

  deliver(): void {
    throw new Error("Cannot deliver before shipping");
  }
}
class ShippedState implements OrderState {
  pay(): void {
    throw new Error("Already paid");
  }

  ship(): void {
    throw new Error("Already shipped");
  }

  deliver(order: Order): void {
    console.log("Order delivered");
    order.setState(new DeliveredState());
  }
}
class DeliveredState implements OrderState {
  pay(): void {
    throw new Error("Order completed");
  }

  ship(): void {
    throw new Error("Order completed");
  }

  deliver(): void {
    throw new Error("Order already delivered");
  }
}

class Order {
  private state: OrderState;

  constructor() {
    this.state = new CreatedState();
  }

  setState(state: OrderState) {
    this.state = state;
  }

  pay() {
    this.state.pay(this);
  }

  ship() {
    this.state.ship(this);
  }

  deliver() {
    this.state.deliver(this);
  }
}


const order = new Order();

order.pay();
order.ship();
order.deliver();
