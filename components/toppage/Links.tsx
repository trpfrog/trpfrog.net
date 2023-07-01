import Block from "../Block";
import styles from "../../app/style.module.scss";
import Link from "next/link";
import {getMyLinkRecords, MyLinkRecord} from "../../lib/MyLinks";

type Props = {
  id?: string
}

export default async function Links({id}: Props) {
  const myLinks: MyLinkRecord[] = await getMyLinkRecords()

  return (
    <Block title={'リンク集'} h2icon={'robot'} id={styles.links}>
      <div className={styles.link_grid}>
        {myLinks.map(({url, siteName, description}) => (
          <div key={siteName} className={styles.link_block}>
            <p style={{textAlign: "center"}}>
              <a href={url} className="linkButton">
                {siteName}
              </a>
            </p>
            <p>
              {description}
            </p>
          </div>
        ))}
      </div>

      <h2 className="hina">相互リンク</h2>
      <p>
        移動しました！
      </p>
      <p>
        <Link href={'/links'} className={'linkButton'}>
          相互リンク
        </Link>
      </p>
    </Block>
  )
}
