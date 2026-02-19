/*
Design a system to process payments for an e-commerce application.

The system should support:

Credit Card payments

UPI payments

Wallet payments

For now, just focus on initiating a payment.

The system should be easy to extend when new payment methods are added in the future.

*/

// interface Ipay{
//     pay():void
// }

// class UPIPay implements Ipay {
//     pay(): void {
//         console.log("this is UPI pay !")
//     }
// }

// class Card implements Ipay {
//     pay(): void {
//         console.log("this is card pay !")
//     }
// }
// class Wallet implements Ipay {
//     pay(): void {
//         console.log("this is UPI pay !")
//     }
// }

// class PaymentFactory {

//     static getPaymentMethod(type :string) : Ipay{
//         switch(type) {
//             case "UPI" :
//                 return new UPIPay()
//             case "WALLET" :
//                 return new Wallet()
//             case "CARD" :
//                 return new Card()
//             default :
//                 throw new Error("Unsupported payment type");
//         }
//     }

// }

// class RegistryPaymentFactory {
//     private static  paymentMethod  = new Map<string , ()=>Ipay>()
//     // We store a creator function so that a new payment object is created per transaction instead of sharing state.
//     static registerPayment(type:string , method : ()=>Ipay){
//         this.paymentMethod.set(type , method)
//     }
//     static getPaymentMethod(type:string):Ipay{
//     const pm = this.paymentMethod.get(type)
//     if(!pm){
//         throw new Error("Payment is not valid")
//     }
//     return pm()
// }
// }
// RegistryPaymentFactory.registerPayment('UPI' ,()=>new UPIPay())
// RegistryPaymentFactory.registerPayment('CARD' ,()=>new Card())
// RegistryPaymentFactory.registerPayment('WALLET' ,()=>new Wallet())

// class InitiatePayment {
//     makePayment(type : string){
//         const paymentMethod = RegistryPaymentFactory.getPaymentMethod(type)
//         paymentMethod.pay()
//     }
// }

// let payment = new InitiatePayment()
// payment.makePayment("UPI")

// ======================================================================== further more ============================ state and cancellation

enum PaymentStatus {
  INITIATED = "INITIATED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

interface PaymentMethod {
  initiate(amount: number): Promise<PaymentResult>;
  cancel?(transactionId: string): Promise<PaymentResult>;
}

class PaymentResult {
  constructor(
    public status: PaymentStatus,
    public transactionId: string,
    public message?: string,
  ) {}
}

class UPIPay implements PaymentMethod {
  async initiate(amount: number): Promise<PaymentResult> {
    return new PaymentResult(
      PaymentStatus.SUCCESS,
      `UPI-${Date.now()}`,
      "Payment is success by upi payment",
    );
  }

  async cancel(transactionId: string): Promise<PaymentResult> {
    return new PaymentResult(
      PaymentStatus.CANCELLED,
      transactionId,
      "Payment Cancelled success",
    );
  }
}

class CardPay implements PaymentMethod {
  async initiate(amount: number): Promise<PaymentResult> {
    return new PaymentResult(
      PaymentStatus.SUCCESS,
      `CARD-${Date.now()}`,
      "Payment is success",
    );
  }
}

class Payment {
  private status: PaymentStatus = PaymentStatus.INITIATED;
  private transactionId?: string;

  constructor(
    private amount: number,
    private paymentMethod: PaymentMethod,
  ) {}

  async initiatePayment(): Promise<PaymentResult> {
    const res = await this.paymentMethod.initiate(this.amount);
    this.status = res.status;
    this.transactionId = res.transactionId;
    return res;
  }

  async cancel(): Promise<PaymentResult> {
    if (this.status !== PaymentStatus.INITIATED) {
      throw new Error("Payment cannot be cancelled in current state");
    }

    if (!this.paymentMethod.cancel || !this.transactionId) {
      throw new Error("Cancellation not supported");
    }

    const result = await this.paymentMethod.cancel(this.transactionId);
    this.status = result.status;

    return result;
  }

  getStatus(): PaymentStatus {
    return this.status;
  }
}


class PaymentMethodRegistry {
  private static registry = new Map<string, () => PaymentMethod>();

  static register(type: string, creator: () => PaymentMethod) {
    this.registry.set(type, creator);
  }

  static get(type: string): PaymentMethod {
    const creator = this.registry.get(type);
    if (!creator) throw new Error("Unsupported payment method");
    return creator();
  }
}

PaymentMethodRegistry.register("CARD", () => new CardPay());
PaymentMethodRegistry.register("UPI", () => new UPIPay());

(async () => {
  const method = PaymentMethodRegistry.get("UPI");

  const payment = new Payment(500, method);

  const result = await payment.initiatePayment();
  console.log(result);

  if (payment.getStatus() === PaymentStatus.INITIATED) {
    const cancelResult = await payment.cancel();
    console.log(cancelResult);
  }
})();


