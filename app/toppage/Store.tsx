import Block from "../../components/Block";
import styles from "../../styles/top-page/main.module.scss";
import Image from "next/legacy/image";


type Props = {
  id?: string
}

const Store = ({id}: Props) => {
  return (
    <Block title={'ストア'} h2icon={'otaku'} id={id}>
      <p>
        つまみさんのスタンプ・グッズ<br/>
        好評発売中！
      </p>
      <div className={styles.link_grid}>
        <div className={styles.link_block}>
          <a
            href="https://store.line.me/stickershop/product/4674940/ja"
            className="linkButton"
          >LINEスタンプ vol.1</a>
        </div>
        <div className={styles.link_block}>
          <Image
            src={'sticker_pr'}
            width={18}
            height={15}
            className={'rich_image'}
            layout={'responsive'}
            objectFit={'contain'}
            alt={'つまみグッズの画像'}
          />
          <a
            href="https://store.line.me/stickershop/product/8879469/ja"
            className="linkButton"
            style={{marginTop: '10px'}}
          >LINEスタンプ vol.2</a>
        </div>
        <div className={styles.link_block}>
          <Image
            src={'goods'}
            width={100}
            height={70}
            layout={'responsive'}
            objectFit={'contain'}
            alt={'つまみグッズの画像'}
          />
          <a
            href="https://suzuri.jp/TrpFrog"
            className="linkButton"
          >つまみグッズ on SUZURI</a>
        </div>
      </div>
    </Block>
  )
}

export default Store
