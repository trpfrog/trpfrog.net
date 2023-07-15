import type {Metadata} from 'next'
import Link from "next/link";
import Image from "next/legacy/image";
import Title from "@/components/Title";
import Block from "@/components/Block";
import styles from "./style.module.scss";
import MainWrapper from "@/components/MainWrapper";

export const metadata = {
  title: 'スタンプ素材集',
  description: 'つまみスタンプの素材集です'
} satisfies Metadata

export default function Index() {
  return (
    <MainWrapper>
      <Title title={metadata.title}>
        <p>
          つまみスタンプの元画像の5倍に拡大したやつです。<br/>
          良識の範囲内でご自由にどうぞ。(Twitterの会話とか)
        </p>
        <a href={'https://store.line.me/stickershop/product/8879469/ja'}>LINEスタンプ発売中！</a>
      </Title>
      <Block>
        <div className={styles.icon_grid}>
          {Array.from(Array(80), (v, k) => k).map(i => (
            // @ts-ignore
            (<Link href={'/stickers/' + i} key={i}>
              <Image
                src={'stickers/' + i}
                width={100}
                height={100}
                objectFit={'contain'}
                quality={15}
                alt={i + '番目のスタンプ画像'}
              />
            </Link>)
          ))}
        </div>
      </Block>
    </MainWrapper>
  );
}

