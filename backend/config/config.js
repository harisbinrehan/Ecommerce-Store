import stripe from 'stripe';

const {
  PORT,
  MONGO_URL,
  PUBLISHABLE_KEY,
  SECRET_KEY,
  PASSPORT_SECRET_KEY
} = process.env;

const stripePublishableClient = stripe(PUBLISHABLE_KEY);
const stripeSecretKeyClient = stripe(SECRET_KEY);
export {
  PORT,
  MONGO_URL,
  stripePublishableClient,
  stripeSecretKeyClient,
  PASSPORT_SECRET_KEY
};
