import React, {CSSProperties, FunctionComponent} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import {format, parseISO} from "date-fns";
import {BlogPost} from "../../lib/blog/load";
import styles from "../../styles/blog/blog.module.scss";
import {getEmojiImageSrc} from "../../lib/blog/tags";
import Title from "../Title";
import {formatReadTime} from "../../lib/blog/readTime";

type Props = {
    entry: BlogPost
    showTitle?: boolean
    showDescription?: boolean
    showDate?: boolean
    showUpdatedDate?: boolean
    showTags?: boolean
    thinPadding?: boolean
    showBackground?: boolean
}

const ArticleBlock: FunctionComponent<Props> = ({
    children, entry,
    showTitle = true,
    showDescription = true,
    showDate = true,
    showUpdatedDate = true,
    showTags = true,
    showBackground = true,
    thinPadding = false,
}) => {

    const thumbnailStyle: CSSProperties = entry.thumbnail ? {
        backgroundImage: `url(${entry.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%'
    } : {}

    const {
        minutes: readMin,
        seconds: readSec
    } = formatReadTime(entry.readTime)

    return (
        <div style={showBackground ? thumbnailStyle : {}}>
            <div className={showBackground ? styles.inner_title_block : ''} style={thinPadding ? {padding: 20} : {}}>
                {showTitle &&
                    <h2 className={'none'}>
                        <Link href={'/blog/entry/' + entry.slug}>
                            <a>{entry.title}</a>
                        </Link>
                    </h2>
                }
                <p>
                    {showDate &&
                        <>
                            <FontAwesomeIcon icon={faCalendarDay}/>{' '}
                            <time dateTime={entry.date}>
                                {format(parseISO(entry.date), 'yyyy年M月d日')}
                            </time>
                        </>
                    }
                    {(showUpdatedDate && entry.updated && entry.date != entry.updated) &&
                        <>
                            <br/>
                            <FontAwesomeIcon icon={faSyncAlt}/>{' '}
                            <time dateTime={entry.updated}>
                                {format(parseISO(entry.updated), 'yyyy年M月d日')}
                            </time>
                        </>
                    }
                    {entry.readTime > 0 &&
                        <>
                            <br/>
                            <FontAwesomeIcon icon={faClock}/>{' '}
                            予想読了時間 {readMin} 分 {readSec} 秒
                        </>
                    }
                </p>
                <p>
                    {showDescription && entry.description}
                </p>

                {/* Tags */}
                <div>
                    {showTags && entry.tags
                        .split(',')
                        .map((t: string) => t.trim())
                        .map(tag => (
                            <Link href={'/blog/tags/' + tag} key={tag}>
                                <a className={styles.tag_block}>
                                    <span className={styles.tag_emoji}>
                                        <img src={getEmojiImageSrc(tag)} width={20} height={20} alt={'tag emoji'}/>
                                    </span>
                                    <span className={styles.tag_name}>
                                        {tag}
                                    </span>
                                </a>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArticleBlock
