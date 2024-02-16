import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";

import Card from "../components/Card";
import { Footer } from "../components/Footer";
import Skeleton from "../components/Skeleton";

const graphcms = new GraphQLClient(
    "https://api-eu-central-1.hygraph.com/v2/cl5pffsmt24cw01ui9yhp2cq5/master"
);

const query = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`;

// export async function get() {
//     const { posts } = await graphcms.request(query);
//
//     return {
//         props: {
//             posts,
//         },
//     };
// }

export default function Home() {
    const [updatedPosts, setUpdatedPosts] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            const { posts: updatedPosts } = await graphcms.request(query);
            setUpdatedPosts(updatedPosts);
        }
        fetchPosts()
        const interval = setInterval(fetchPosts, 1000); // Обновление данных каждую минуту

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Ibragimoov Blog</title>
                <meta name="description" content="Created by Ibragimoov Co. Ltd." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {updatedPosts ?
                    <div className='card__wrapper'>
                        {updatedPosts.map((post) => (
                            <Card
                                title={post.title}
                                author={post.author}
                                coverPhoto={post.coverPhoto}
                                key={post.id}
                                datePublished={post.datePublished}
                                slug={post.slug}
                            />
                        ))}
                    </div> :
                    <div className={'skeleton__wrapper'}>
                        {[0, 1, 2, 3, 4, 5].map((_) => (<Skeleton/>))}
                    </div>
                }
            </main>
        </div>
    );
}
