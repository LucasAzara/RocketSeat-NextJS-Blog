import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  // Variables to determine if user is subscribed to website to redirect to the full article post
  const { data: session } = useSession();
  const router = useRouter();

  // Effect takes place when site detects user is subscribed to website
  useEffect(() => {
    if (session?.activeSub) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Want to continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

// List of pages that will be generated statically
export const getStaticPaths: GetStaticPaths = () => {
  return {
    //   List of Pages
    paths: [],
    fallback: "blocking",
  };
};

// Due to it being a public page, it can be static.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get Slug from post
  const { slug } = params;

  // Get Client from Prismic
  const prismic = getPrismicClient();

  // Get post by UID ( slug )
  const response = await prismic.getByUID("post", String(slug), {});

  //   Post data formatting
  const post = {
    slug,
    title: RichText.asText(response.data["Title"]),
    // Get the first 3 content blocks from article
    content: RichText.asHtml(response.data["content"].splice(0, 3)),
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
    redirect: 60 * 30, // 30 minutes
  };
};
