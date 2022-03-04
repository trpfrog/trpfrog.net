import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock} from "@fortawesome/free-solid-svg-icons";
import {BlogPost} from "../../lib/blog/load";
import styles from "../../styles/blog/ArticleCard.module.scss";
import Image from "next/image";
import {getPureCloudinaryPath} from "./BlogMarkdown";
import dayjs from "dayjs";
import Tag from "./Tag";

type Props = {
    entry: BlogPost
}

const ArticleCard = ({entry}: Props) => {

    return (
        <Link href={'/blog/entry/' + entry.slug}>
            <a className={styles.window}>
                <div className={styles.tags}>
                    {entry.tags
                        .split(',')
                        .map((t: string) => t.trim())
                        .map(tag => <Tag tag={tag} key={tag}/>)
                    }
                </div>
                <Image
                    src={getPureCloudinaryPath(entry.thumbnail ?? '/TwitterCard')}
                    alt={'thumbnail of ' + entry.slug}
                    width={600}
                    height={400}
                    objectFit={"cover"}
                    className={styles.thumbnail}
                />
                <div className={styles.h3_wrapper}>
                    <h3>{entry.title}</h3>
                </div>
                <div className={styles.information}>
                    <FontAwesomeIcon icon={faCalendarDay} style={{margin: 'auto'}}/>{' '}
                    {dayjs(entry.date).format('YYYY-MM-DD')} <br/>
                    <FontAwesomeIcon icon={faClock} style={{margin: 'auto'}}/>{' '}
                    {Math.ceil(entry.readTime / 60)} min to read
                </div>
            </a>
        </Link>
    )
}

export default ArticleCard
