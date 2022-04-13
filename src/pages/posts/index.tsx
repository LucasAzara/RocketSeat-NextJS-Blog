import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";
import { getPrismicClient } from "../../services/prismic";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>13 de Abril de 2022</time>
            <strong>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae est nobis labore quas rem iusto facilis numquam quis
              delectus ducimus impedit minus, aut provident in exercitationem
              maiores. Itaque, magni voluptatum.
            </strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
              illum consequuntur perspiciatis consectetur earum iste saepe
              molestias incidunt qui expedita voluptatum sint eligendi! Adipisci
              porro ipsum delectus veniam nulla odio!
            </p>
          </a>
          <a href="#">
            <time>13 de Abril de 2022</time>
            <strong>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae est nobis labore quas rem iusto facilis numquam quis
              delectus ducimus impedit minus, aut provident in exercitationem
              maiores. Itaque, magni voluptatum.
            </strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
              illum consequuntur perspiciatis consectetur earum iste saepe
              molestias incidunt qui expedita voluptatum sint eligendi! Adipisci
              porro ipsum delectus veniam nulla odio!
            </p>
          </a>
          <a href="#">
            <time>13 de Abril de 2022</time>
            <strong>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae est nobis labore quas rem iusto facilis numquam quis
              delectus ducimus impedit minus, aut provident in exercitationem
              maiores. Itaque, magni voluptatum.
            </strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
              illum consequuntur perspiciatis consectetur earum iste saepe
              molestias incidunt qui expedita voluptatum sint eligendi! Adipisci
              porro ipsum delectus veniam nulla odio!
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: [],
      pageSize: 100,
    }
  );

  console.log(response);

  return {
    props: {},
  };
};
