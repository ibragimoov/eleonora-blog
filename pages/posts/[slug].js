import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";

import styles from "../../styles/Slug.module.css";
import {useSearchParam, useSearchParams} from "next/dist/client/components/hooks-client";
import {useRouter} from "next/router";
import Skeleton from "../../components/Skeleton";

const graphcms = new GraphQLClient(
    "https://api-eu-central-1.hygraph.com/v2/cl5pffsmt24cw01ui9yhp2cq5/master"
);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

export default function BlogPost({ post }) {
    const router = useRouter();
    const [currenctPost, setCurrentPost] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            const { slug } = router.query
            if (slug) {
                try {
                    const { post } = await graphcms.request(query, { slug })
                    setCurrentPost(post)
                } catch (error) {
                    console.error("Error loading post:", error)
                }
            }
        };

        loadPost();
    }, [router.query])

    if (!currenctPost) {
        return <Skeleton />
    }

    return (
        <main className={styles.blog}>
            <h2 className="blog-title">{currenctPost.title}</h2>
            <br />
            <img
                src={currenctPost.coverPhoto.url}
                className={styles.cover}
                alt="coverPhoto"
            />
            <div className={styles.title}>
                <div className={styles.author}>
                    <img src={currenctPost.author.avatar.url} alt="author-photo" />
                    <div className={styles.authtext}>
                        <h6>Написал статью: {currenctPost.author.name}</h6>
                        <h6 className={styles.date}>{currenctPost.datePublished}</h6>
                    </div>
                </div>
            </div>
            <div className={styles.content - currenctPost}>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: currenctPost.content.html }}
                ></div>
            </div>
        </main>
    );
}

// export async function getServerSideProps({ params }) {
//     const slug = params.slug;
//     const { post } = await graphcms.request(query, { slug });
//
//     return {
//         props: {
//             post,
//         },
//     };
// }
