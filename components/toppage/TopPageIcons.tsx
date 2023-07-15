import Block from "@/components/Block";
import styles from "@/app/style.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";

;

type Props = {
  id?: string
}

const TopPageIcons = ({id}: Props) => {
  return (
    <Block title={'作ったアイコン'} h2icon={'evil'} id={id}>
      <div className={styles.top_icons}>
        {[0, 7, 5, 6].map(i => i.toString()).map(i => (
          <Image
            key={i}
            src={'icons_gallery/' + i}
            width={100}
            height={100}
            layout={'responsive'}
            objectFit={'contain'}
            quality={15}
            alt={i + '番目のスタンプ画像'}
          />
        ))}
      </div>
      <Link href={'/icons'} className="linkButton">
        もっと見る
      </Link>
    </Block>
  )
}

export default TopPageIcons
