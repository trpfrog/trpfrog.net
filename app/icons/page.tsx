import Link from "next/link";
import Image from "next/legacy/image";
import Title from "../../components/Title";
import Block from "../../components/Block";
import styles from "../stickers/style.module.scss";
import {Metadata} from "next";

export const metadata = {
  title: 'つまみアイコン集',
  description: 'つまみちゃんの作ったアイコンです。'
} satisfies Metadata

export default function Index()  {
  return (
    <div id="main_wrapper">
      <Title title={'アイコン集'}>
        <p>
          つまみちゃんの作ったアイコンです。クリックで高解像度版に飛びます。
        </p>
        <p>
          Hugging Face Datasets でも利用可能です！
        </p>
        <p>
          <a href={'https://huggingface.co/datasets/TrpFrog/trpfrog-icons'} className={'linkButton'}>trpfrog-icons on 🤗Datasets</a>
        </p>
      </Title>
      <Block>
        <div className={styles.icon_grid}>
          {Array.from(Array(33), (v, k) => k).map(i => (
            // @ts-ignore
            (<Link href={'/icons/' + i} key={i}>
              <Image
                src={'icons_gallery/' + i}
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
      <Block title={'データセット'}>
        <p>
          つまみアイコンデータセットが Hugging Face Datasets にて使えるようになりました！🎉
        </p>
        <p>
          <a href={'https://huggingface.co/datasets/TrpFrog/trpfrog-icons'} className={'linkButton'}>trpfrog-icons</a>
        </p>
        <pre style={{background: "#333", color: "white", borderRadius: 5, padding: "4px 10px"}}>
          {"from datasets import load_dataset\n"}
          {"dataset = load_dataset('TrpFrog/trpfrog-icons')"}
        </pre>
      </Block>
    </div>
  );
}

