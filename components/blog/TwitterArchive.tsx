import styles from "../../styles/blog/TwitterArchive.module.scss";
import React from "react";

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
            <div className={styles.box}>
                <div className={styles.header}>
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
                <div className={styles.tweet}>
                    <blockquote>
                        {tweetData.tweet}
                    </blockquote>
                </div>
                <div className={styles.date}>
                    <a href={tweetLink} target="_blank" rel="noreferrer">
                        {tweetData.date}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TwitterArchive