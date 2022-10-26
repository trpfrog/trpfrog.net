import Block from "../Block";
import styles from "../../styles/top-page/main.module.scss";
import Link from "next/link";
import {MyLinkRecord} from "../../lib/MyLinks";

type Props = {
    myLinks: MyLinkRecord[]
    id?: string
}

const Links = ({id, myLinks}: Props) => {
  return (
    <Block title={'リンク集'} h2icon={'robot'} id={styles.links}>
      <div className={styles.link_grid}>
        {myLinks.map(({ url, siteName, description }) => (
          <div key={siteName} className={styles.link_block}>
            <p style={{textAlign: "center"}}>
              <Link href={url}>
                <a className="linkButton">{siteName}</a>
              </Link>
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
        <Link href={'/links'}>
          <a className={'linkButton'}>相互リンク</a>
        </Link>
      </p>
    </Block>
  )
}

export default Links
