import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// Gets code that will be readable in human language
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

// Converts Readable stream into a string
async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

// Disabled to accept stream based data in Next and not just json data
export const config = {
  api: {
    bodyParser: false,
  },
};

// List of events that are wanted
const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscriptions.updated",
  "customer.subscriptions.deleted",
]);

const Webhooks = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // String of stream into Variable
    const buff = await buffer(req);
    // Secret code to make sure it is the actual user trying to execute the code
    const secret = req.headers["stripe-signature"];

    // Stripe Event Cariable ( Empty )
    let event: Stripe.Event;

    try {
      // If all 3 paramaters work, then it's safe to continue, if not error
      event = stripe.webhooks.constructEvent(
        buff,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Type of event
    const eventType = event.type;

    if (relevantEvents.has(eventType)) {
      try {
        switch (eventType) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            // event.data.object as type Stripe.Subscription
            const subscription = event.data.object as Stripe.Subscription;

            console.log(subscription);

            await saveSubscription(
              subscription.id,
              subscription.customer.toString()
            );

          case "checkout.session.completed":
            // event.data.object as type Stripe.Checkout.Session to be easier to see which methods are available when coding
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            // SaveSubscription into database, wait for database to store data
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );
            break;
          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        return res.json({ error: "Webhook handler failed" });
      }
    }

    res.json({ received: true });
  } else {
    // Error could be due because header doesn't allow POST Requests, this could fix it.
    res.setHeader("Allow", "POST");
    // Error
    res.status(405).end("Method not allowed");
  }
};

export default Webhooks;
