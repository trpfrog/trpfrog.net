import Link from 'next/link'
import Image from "next/legacy/image";
import {GetStaticProps} from "next";
import Layout from "../../components/Layout";
import Block from "../../components/Block";
import styles from "../../styles/imageview.module.scss"
import Title from "../../components/Title";

const NUMBER_OF_IMAGES = 33;

type PageProps = {
    id: string
}

type Params = {
    id: string
}

export const getStaticPaths = () => {
  const paths = Array.from(Array(NUMBER_OF_IMAGES), (v, k) => {
    return {params: {id: k.toString()}}
  });
  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({params}) => {
  const id = params!.id;
  return {
    props: {
      id
    }
  }
}

const ImageViewer = ({ id }: PageProps) => {
  const idInt = parseInt(id);
  return (
    <Layout>
      <Title title={'アイコンビューア'} style={{display: 'none'}} />
      <Block>
        <div className={styles.img_wrapper_outside}>
          <div className={styles.img_wrapper_inside}>
            <Image
              src={'icons_gallery/' + id}
              width={100}
              height={100}
              layout={'responsive'}
              objectFit={'contain'}
              alt={id + '番目のアイコン'}
            />
          </div>
        </div>
      </Block>
      <Block id={styles.img_navigation}>
        <div id={styles.thumbnails}>
          <Link
            href={'/icons/' + ((idInt - 1 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES).toString()}
            id={styles.prev_image}>
                        &larr;
          </Link>
          {Array.from(Array(5), (v, k) => k)
            .map(k => (idInt + k - 2 + NUMBER_OF_IMAGES) % NUMBER_OF_IMAGES)
            .map(k => { return (
              <Image
                key={k}
                src={'icons_gallery/' + k}
                width={100}
                height={100}
                objectFit={'contain'}
                quality={50}
                alt={k + '番目のアイコン'}
              />
            )
            })}
          <Link
            href={'/icons/' + ((idInt + 1) % NUMBER_OF_IMAGES).toString()}
            id={styles.next_image}>
                        &rarr;
          </Link>
        </div>
      </Block>
      <Block>
        <div style={{textAlign: 'center'}}>
          <Link href={'/icons'} className={'linkButton'}>
                        一覧に戻る
          </Link>
        </div>
      </Block>
      <Block title={'既知のバグ'}>
        <p>
                    画像のロードが遅すぎてページ遷移をしていないように見える
        </p>
      </Block>
    </Layout>
  );
};

export default ImageViewer;
