import { Metadata } from 'next'

import ImageList, { ImagePaths } from '@/app/(gallery)/_components/ImageList'

import { Button } from '@/components/atoms/Button'
import MainWrapper from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import Title from '@/components/organisms/Title'

export const metadata = {
  title: 'つまみアイコン集',
  description: 'つまみちゃんの作ったアイコンです。',
} satisfies Metadata

export default function Index() {
  const imagePaths: ImagePaths[] = Array.from(Array(33), (v, k) => k).map(i => {
    return {
      src: 'icons_gallery/' + i,
      url: '/icons/' + i,
    }
  })

  return (
    <MainWrapper>
      <Title title={'アイコン集'}>
        <p>
          つまみちゃんの作ったアイコンです。クリックで高解像度版に飛びます。
        </p>
        <p>Hugging Face Datasets でも利用可能です！</p>
        <p>
          <Button
            externalLink={true}
            href={'https://huggingface.co/datasets/TrpFrog/trpfrog-icons'}
          >
            trpfrog-icons on 🤗Datasets
          </Button>
        </p>
      </Title>
      <Block>
        <ImageList images={imagePaths} />
      </Block>
      <Block title={'データセット'}>
        <p>
          つまみアイコンデータセットが Hugging Face Datasets
          にて使えるようになりました！🎉
        </p>
        <p>
          <Button
            externalLink={true}
            href={'https://huggingface.co/datasets/TrpFrog/trpfrog-icons'}
          >
            trpfrog-icons
          </Button>
        </p>
        <pre
          style={{
            background: '#333',
            color: 'white',
            borderRadius: 5,
            padding: '4px 10px',
          }}
        >
          {'from datasets import load_dataset\n'}
          {"dataset = load_dataset('TrpFrog/trpfrog-icons')"}
        </pre>
      </Block>
    </MainWrapper>
  )
}
