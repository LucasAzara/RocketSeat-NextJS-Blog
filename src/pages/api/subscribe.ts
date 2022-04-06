import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

const Subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Get current session data from frontend
    const session = await getSession({ req });

    // Create Customer to be added to stripe
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      // metadata
    });

    // Configuration for checkout of stripe (payments of the site)
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1KiTK0HDeVM77lK1UhZRvCVw", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    // Return json with status of 200 with the information of the checkout session
    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    // Error could be due because header doesn't allow POST Requests, this could fix it.
    res.setHeader("Allow", "POST");
    // Error
    res.status(405).end("Method not allowed");
  }
};

export default Subscribe;
