class OldPaymentLegacy {
    processPayment(amount: number): string {
        return `Processing payment of $${amount} through Legacy System.`;
    }
}


interface INewPaymentSystem {
    makePayment(amount: number): string;
}

class PaymentAdapter implements INewPaymentSystem {
    private legacyPayment: OldPaymentLegacy;

    constructor(legacyPayment: OldPaymentLegacy) {
        this.legacyPayment = legacyPayment;
    }

    makePayment(amount: number): string {
        // Adapting the old method to the new interface
        return this.legacyPayment.processPayment(amount);
    }
}

let oldPayment = new OldPaymentLegacy();
let newPayment: INewPaymentSystem = new PaymentAdapter(oldPayment);
console.log(newPayment.makePayment(100)); // Processing payment of $100 through Legacy System. ✅