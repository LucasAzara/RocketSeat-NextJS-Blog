import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "../styles/home.module.scss";

export default function Home() {
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
            Get acess to all the publications <span>for $9.90 a month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Woman Coding" />
      </main>
    </>
  );
}
