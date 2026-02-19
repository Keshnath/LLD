type PaymentFn = () => void;

const upiPay: PaymentFn = () => {
  console.log("Payment made via UPI");
};

const cardPay: PaymentFn = () => {
  console.log("Payment made via Card");
};

const walletPay: PaymentFn = () => {
  console.log("Payment made via Wallet");
};

type PaymentRegistry = Record<string, PaymentFn>;

const paymentRegistry: PaymentRegistry = {};

const registerPaymentMethod = (
  type: string,
  paymentFn: PaymentFn
): void => {
  paymentRegistry[type] = paymentFn;
};


const getPaymentMethod = (type: string): PaymentFn => {
  const paymentFn = paymentRegistry[type];

  if (!paymentFn) {
    throw new Error(`Payment method ${type} not supported`);
  }

  return paymentFn;
};

const initiatePayment = (paymentType: string): void => {
  const paymentFn = getPaymentMethod(paymentType);
  paymentFn();
};


registerPaymentMethod("UPI", upiPay);
registerPaymentMethod("CARD", cardPay);
registerPaymentMethod("WALLET", walletPay);

initiatePayment("UPI");

