import styles from "../../styles/blog/TwitterArchive.module.scss";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDove} from "@fortawesome/free-solid-svg-icons";

type Props = {
    content: string
}

const TwitterArchive = ({content}: Props) => {
    const tweetData: { [key: string]: string } = {}
    const lines = content.trim().split('\n')
    for (const line of lines) {
        const key = line.split(':')[0]
        tweetData[key] = line.split(':').slice(1).join(':').trim()
    }
    const userLink  = 'https://twitter.com/' + tweetData.userid
    const tweetLink = userLink + '/status/' + tweetData.id

    return (
        <div className={styles.wrapper}>
            <div className={styles.box} onClick={() => window.open(tweetLink)}>
                <div className={styles.header}>
                    <div className={styles.header_left}>
                        <div
                            className={styles.icon}
                            style={{background: tweetData.color ?? '#90e200'}}
                            onClick={() => window.open(userLink)}
                        />
                        <div className={styles.name_box}>
                            <a href={userLink} target="_blank" rel="noreferrer">
                                <div className={styles.name}>{tweetData.name}</div>
                                <div className={styles.userid}>@{tweetData.userid}</div>
                            </a>
                        </div>
                    </div>
                    <div className={styles.logo}>
                        <FontAwesomeIcon icon={faDove} style={{fontSize: '1.5em'}}/>
                    </div>
                </div>
                <div className={styles.tweet}>
                    <blockquote dangerouslySetInnerHTML={{__html: tweetData.tweet}} />
                </div>
                <div className={styles.date}>
                    {tweetData.date}
                </div>
            </div>
        </div>
    )
}

export default TwitterArchive