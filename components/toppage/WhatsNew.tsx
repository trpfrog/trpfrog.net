import styles from "../../styles/top-page/WhatsNew.module.scss";
import ReactMarkdown from "react-markdown";
import Block from "../Block";
import {WhatsNewRecord} from "../../lib/whats_new";

type Props = {
    id?: string
    whatsNewRecords: WhatsNewRecord[]
}

const WhatsNew = ({id, whatsNewRecords}: Props) => {
    return (
        <Block title={'最新情報'} h2icon={'robot'} id={id}>
            <div id={styles.whats_new_table}>
                {whatsNewRecords.map(({text, date}) => (
                    <div key={text} className={styles.whats_new_row}>
                        <div className={styles.whats_new_date}>{date}</div>
                        <div><ReactMarkdown>{text}</ReactMarkdown></div>
                    </div>
                ))}
            </div>
        </Block>
    )
}

export default WhatsNew
