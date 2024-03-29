import {PortOne} from '../src';

const portOne = new PortOne();

(async () => {
  await portOne.login({
    authorization: {
      type: 'SECRET',
      secret: 'MY_API_SECRET',
    },
    storeId: 'store-e4038486-8d83-41a5-acf1-844a009e0d94',
  });

  const payment = await portOne.payments.getPayment({
    paymentId: '79dfbd22-d66b-4cc4-b350-ffa2fe2fec42',
  });

  if (payment.data) {
    console.log(payment.data);
  } else {
    console.error(payment.error);
  }
})();
