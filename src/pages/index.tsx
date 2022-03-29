import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "../styles/home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> World
          </h1>
          <p>
            Get access to all the publications
            <span>for {product.amount} a month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Woman Coding" />
      </main>
    </>
  );
}

// Creates a SSG variable that is only updated once every 24 hours.
export const getStaticProps: GetStaticProps = async () => {
  // Retrieves the current price of product from stripe
  const price = await stripe.prices.retrieve("price_1KiTK0HDeVM77lK1UhZRvCVw", {
    expand: ["product"],
  });

  // Converted into an object
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    // When to update again.
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
