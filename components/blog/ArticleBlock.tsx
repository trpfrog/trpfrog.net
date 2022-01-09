import React, {FunctionComponent} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import {format, parseISO} from "date-fns";
import {BlogPost} from "../../lib/blog";
import styles from "../../styles/blog.module.scss";
import {getEmojiImageSrc} from "../../lib/blogTag";

type Props = {
    entry: BlogPost
    showTitle?: boolean
    showDescription?: boolean
    showDate?: boolean
    showUpdatedDate?: boolean
    showTags?: boolean
}

const ArticleBlock: FunctionComponent<Props> = ({
    children, entry,
    showTitle = true,
    showDescription = true,
    showDate = true,
    showUpdatedDate = true,
    showTags = true,
}) => {
    return (
        <>
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
                            {format(parseISO(entry.date), 'LLLL d, yyyy')}
                        </time>
                    </>
                }
                {(showUpdatedDate && entry.updated && entry.date != entry.updated) &&
                    <>
                        <br/>
                        <FontAwesomeIcon icon={faSyncAlt}/>{' '}
                        <time dateTime={entry.updated}>
                            {format(parseISO(entry.updated), 'LLLL d, yyyy')}
                        </time>
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
        </>
    )
}

export default ArticleBlock
