import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

import styles from "./post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // Getting user session information
  const session = await getSession({ req });

  console.log(session);

  // Get Slug from post
  const { slug } = params;

  // If user is not logged in
  if (!session?.activeSub) {
    // return to homepage
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Get Client from Prismic
  const prismic = getPrismicClient(req);

  // Get post by UID ( slug )
  const response = await prismic.getByUID("post", String(slug), {});

  //   Post data formatting
  const post = {
    slug,
    title: RichText.asText(response.data["Title"]),
    content: RichText.asHtml(response.data["content"]),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-Br",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  // Return Data Formatted
  return {
    props: {
      post,
    },
  };
};
