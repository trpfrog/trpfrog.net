import Link from 'next/link'
import Image from "next/legacy/image";
import {Metadata} from "next";
import Block from "../../../components/Block";
import styles from "../../../styles/imageview.module.scss"
import Title from "../../../components/Title";
import MainWrapper from "@/components/MainWrapper";

const NUMBER_OF_IMAGES = 80;

type PageProps = {
  params: {
    id: string
  }
}

export const metadata = {
  title: 'スタンプビューア',
} satisfies Metadata

export async function generateStaticParams() {
  const ids = Array.from(Array(NUMBER_OF_IMAGES), (v, k) => k);
  return ids.map(id => ({ id: id.toString() }))
}

export default function Index ({ params: { id } }: PageProps) {
  const idInt = parseInt(id);
  return (
    <MainWrapper>
      <Title title={metadata.title} style={{display: 'none'}}/>
      <Block>
        <div className={styles.img_wrapper_outside}>
          <div className={styles.img_wrapper_inside}>
            <Image
              src={'stickers/' + id}
              width={100}
              height={100}
              layout={'responsive'}
              objectFit={'contain'}
              alt={id + '番目のスタンプ画像'}
            />
          </div>
        </div>
      </Block>
      <Block id={styles.img_navigation}>
        <div id={styles.thumbnails}>
          {/* @ts-ignore */}
          <Link href={'/stickers/' + ((idInt - 1 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES).toString()}
            id={styles.prev_image}>
            &larr;
          </Link>
          {Array.from(Array(5), (v, k) => k)
            .map(k => (idInt + k - 2 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES)
            .map(k => {
              return (
                <Image
                  key={k}
                  src={'stickers/' + k}
                  width={100}
                  height={100}
                  objectFit={'contain'}
                  quality={50}
                  alt={k + '番目のスタンプ画像'}
                />
              )
            })}
          {/* @ts-ignore */}
          <Link href={'/stickers/' + ((idInt + 1) % NUMBER_OF_IMAGES).toString()}
            id={styles.next_image}>
            &rarr;
          </Link>
        </div>
      </Block>
      <Block>
        <div style={{textAlign: 'center'}}>
          <Link href={'/stickers'} className={'linkButton'}>
            一覧に戻る
          </Link>
        </div>
      </Block>
      <Block title={'既知のバグ'}>
        <p>
          画像のロードが遅すぎてページ遷移をしていないように見える
        </p>
      </Block>
    </MainWrapper>
  );
};
