import Link from "next/link";
import styles from "../styles/Card.module.css";

export default function Card({
    title,
    coverPhoto,
    author,
    datePublished,
    slug,
}) {
    return (
        <Link href={"/posts/" + slug}>
            <div className={styles.card}>
                <div className="styles.imgContainer">
                    <img src={coverPhoto.url} alt="coverPhoto" />
                </div>
                <div className={styles.text}>
                    <h2>{title}</h2>
                    <div className={styles.details}>
                        <div className={styles.author}>
                            <img src={author.avatar.url} alt="author-photo" />
                            <h3>{author.name}</h3>

                            <div>
                                <div className={styles.data}>
                                    {datePublished}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
