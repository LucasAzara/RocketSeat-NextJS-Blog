import styles from "./styles.module.scss";
// nextAuth Function
import { useSession, signIn } from "next-auth/react";
// Stripe ( Payment ) Function
import { stripe } from "../../services/stripe";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSub() {
    // If session == false, just sign in to github.
    if (!session) {
      signIn("github");
      return;
    }

    // If subscribed, go to posts page
    if (session.activeSub) {
      router.push("/posts");
      return;
    }

    try {
      // Route of the subscription ( same as the file)
      const response = await api.post("/subscribe");
      // Get sessionId variable from response.data
      const { sessionId } = response.data;

      // Stripe Front End
      const stripe = await getStripeJs();

      // Redirect with object sessionId as parameter (has to be an object)
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSub}
    >
      Subscribe Now
    </button>
  );
}
