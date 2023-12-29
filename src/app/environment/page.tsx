import fs from 'fs/promises'
import path from 'path'

import { Fragment } from 'react'

import { Metadata } from 'next'

import yaml from 'js-yaml'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { H3 } from '@/components/wrappers'

import { GadgetIntro } from './GadgetIntro'

type StringItemizeRecord = (
  | string
  | Record<string, string[]>
  | Record<string, (Record<string, string[]> | string)[]>
)[]

type Items = Record<
  string,
  {
    categoryName: string
    items: {
      name: string
      items: {
        productName: string
        imagePath?: string
        description?: StringItemizeRecord
      }[]
    }[]
  }
>

// recursive function
function Itemize(props: {
  children: StringItemizeRecord | string | undefined
}) {
  if (props.children === undefined) {
    return <></>
  }
  if (typeof props.children === 'string') {
    return <p>{props.children}</p>
  }
  return (
    <ul>
      {props.children.map((child, index) => {
        if (typeof child === 'string') {
          return <li key={index}>{child}</li>
        }
        return (
          <Fragment key={index}>
            {Object.entries(child).map(([key, value]) => (
              <Fragment key={key}>
                <li>{key}</li>
                <Itemize>{value}</Itemize>
              </Fragment>
            ))}
          </Fragment>
        )
      })}
    </ul>
  )
}

export const metadata = {
  title: '作業環境',
  description: 'つまみさんのデスク周りとか所持デバイスとか',
} satisfies Metadata

export default async function Index() {
  // read yaml
  const yamlPath = path.join(
    process.cwd(),
    'src',
    'app',
    'environment',
    'items.yaml',
  )
  const yamlText = await fs.readFile(yamlPath, 'utf-8')

  const items = yaml.load(yamlText) as Items

  return (
    <MainWrapper>
      <Title title={metadata.title} description={metadata.description}>
        <p>Last updated: 2021/12/11</p>
        <GadgetIntro name="" imagePath="desk" />
      </Title>

      {Object.entries(items).map(([key, genre]) => (
        <Block title={genre.categoryName} h2icon="think" key={key}>
          {genre.items.map(item => (
            <div key={item.name}>
              <H3>{item.name}</H3>
              {item.items.map(gadget => (
                <GadgetIntro
                  name={gadget.productName}
                  imagePath={gadget.imagePath}
                  key={gadget.productName}
                >
                  <Itemize>{gadget.description}</Itemize>
                </GadgetIntro>
              ))}
            </div>
          ))}
        </Block>
      ))}
    </MainWrapper>
  )
}
