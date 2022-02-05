import React, {useState} from "react";
import styles from "../../styles/blog/ProfileCards.module.scss";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const ProfileCards: React.FC<{content: string}> = ({children, content}) => {

    const cards = content.split('---')

    const personalDataList = cards.map(card => {
        const personalData: { [key: string]: string } = {}
        const lines = card.trim().split('\n')
        for (const line of lines) {
            const key = line.split(':')[0]
            personalData[key] = line.split(':').slice(1).join(':').trim()
        }
        return personalData
    })

    const [showProfileCards, setShowProfileCards] = useState(true)

    return (
        <>
            {showProfileCards ? (
                <p>
                    <button onClick={() => {setShowProfileCards(false)}}>
                        リスト表示に切り替え
                    </button> {' '}
                    横にスクロールできます。
                </p>
            ) : (
                <p>
                    <button onClick={() => {setShowProfileCards(true)}}>
                        カード表示に切り替え
                    </button>
                </p>
            )}
            {showProfileCards ? (
                <div className={styles.profile_card_grid}>
                    {personalDataList.map(personalData => (
                        <div className={styles.profile_card} key={personalData.name}>
                            <div className={styles.header}>
                                <div className={styles.club}>
                                    {personalData.club}
                                </div>
                                <div className={styles.twitter_id}>
                                    <a href={'https://twitter.com/' + personalData.twitter}>
                                        @{personalData.twitter}
                                    </a>
                                </div>
                            </div>
                            <div className={styles.name}>
                                {personalData.name}
                                <span style={{fontSize: '0.8em'}}>
                                        {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
                                    </span>
                            </div>
                            <div className={styles.description}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {personalData.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <ul>
                    {personalDataList.map(personalData => (
                        <>
                            <li key={personalData.name + '-name'}>
                                {personalData.name}
                                {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
                            </li>
                            <ul key={personalData.name + '-info'}>
                                <li>{personalData.club}</li>
                                <li>
                                    <a href={'https://twitter.com/' + personalData.twitter}>
                                        @{personalData.twitter}
                                    </a>
                                </li>
                                <li>
                                    <ReactMarkdown
                                        components={{ p: ({children}) => <>{children}</> }}
                                        rehypePlugins={[rehypeRaw]}
                                    >
                                        {personalData.description}
                                    </ReactMarkdown>
                                </li>
                            </ul>
                        </>
                    ))}
                </ul>
            )}
        </>
    )
}

export default ProfileCards
