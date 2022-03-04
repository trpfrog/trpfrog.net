import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock} from "@fortawesome/free-solid-svg-icons";
import {BlogPost} from "../../lib/blog/load";
import styles from "../../styles/blog/ArticleCard.module.scss";
import Image from "next/image";
import {getPureCloudinaryPath} from "./BlogMarkdown";
import dayjs from "dayjs";
import Tag from "./Tag";
import {loadDefaultJapaneseParser} from "budoux";

type Props = {
    entry: BlogPost
    hero?: boolean
}

const budouXParser = loadDefaultJapaneseParser()
const parseWithBudouX = (str: string, slug: string) => {
    return budouXParser
        .parse(str)
        .map(e => e
            .split('+')
            .map((f, i) => i % 2 === 0 ? f : '+' + f))
        .flat()
        .map((e, i) => (
            <span
                key={`${slug}-${i}`}
                style={{display: 'inline-block'}}
            >{e}</span>
        ))
}

const ArticleCard = ({entry, hero}: Props) => {

    const articleURL = '/blog/entry/' + entry.slug
    const splitTitle = parseWithBudouX(entry.title, entry.slug)

    return (
        // eslint-disable-next-line @next/next/link-passhref
        <Link href={articleURL}>
            <div className={styles.window}>
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
                    width={hero ? 1000 : 600}
                    height={300}
                    objectFit={"cover"}
                    className={styles.thumbnail}
                />
                <div className={`${styles.h3_wrapper} ${hero && styles.hero_h3_wrapper}`}>
                    <Link href={articleURL}>
                        <a><h3>{splitTitle}</h3></a>
                    </Link>
                </div>
                <div className={styles.information}>
                    <FontAwesomeIcon icon={faCalendarDay} style={{margin: 'auto'}}/>{' '}
                    {dayjs(entry.date).format('YYYY-MM-DD')} <br/>
                    <FontAwesomeIcon icon={faClock} style={{margin: 'auto'}}/>{' '}
                    {Math.ceil(entry.readTime / 60)} min to read
                </div>
            </div>
        </Link>
    )
}

export default ArticleCard
