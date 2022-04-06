import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  // NEXT_PUBLIC_* needed for variable to be usable in front end
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return stripeJs;
}
