import React from 'react'

import { CamelToKebabCase } from '@/lib/types'
import { ParseWithBudouX } from '@/lib/wordSplit'

import { LinkEmbed } from '@blog/_components/article-parts/LinkEmbed'
import { Twitter } from '@blog/_components/article-parts/Twitter'
import { AutoYouTube, YouTube } from '@blog/_components/article-parts/YouTube'
import { ArticleRenderer } from '@blog/_renderer/ArticleRenderer'

import { Conversation } from './article-parts/Conversation'
import { Caution, Infobox, TitledFrame } from './article-parts/HighlightedBoxes'
import { HorizontalImages } from './article-parts/HorizontalImages'
import { HorizontalScroll } from './article-parts/HorizontalScroll'
import { ProfileCards } from './article-parts/ProfileCards'
import { ShowAll } from './article-parts/ShowAll'
import { TwitterArchive as TwitterArchived } from './article-parts/TwitterArchive'
import { WalkingResultBox } from './article-parts/WalkingResultBox'
import {
  IsomorphicArticleParts,
  IsomorphicArticlePartsProps,
} from './ArticleParts'
import { PageTransferButton } from './PageNavigation'

/* eslint-disable react/display-name */
export const myMarkdownClasses = {
  // Socials
  Twitter,
  Youtube: YouTube,
  AutoYoutube: AutoYouTube,
  LinkEmbed,
  TwitterArchived,

  // Walking Parts
  ResultBox: WalkingResultBox,
  ProfileCards: (({ content, entry }) => (
    <ProfileCards content={content} held={entry?.held} />
  )) as IsomorphicArticleParts,

  // Highlight Boxes
  Caution,
  Infobox,

  TitledFrame,

  HorizontalImages,
  HorizontalScroll,
  Conversation,

  ShowAll,

  NextPage: ({ content, entry }) => {
    if (!entry) return <></>
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ margin: '1em 0' }}>
          <PageTransferButton
            entry={entry}
            nextPage={entry.currentPage + 1}
            buttonText={`Next: ${content} →`}
          />
        </div>
      </div>
    )
  },

  Centering: ({ content, entry, imageSize }) => (
    <div style={{ textAlign: 'center' }}>
      <ArticleRenderer toRender={content} entry={entry} imageSize={imageSize} />
    </div>
  ),

  CenteringWithSize: ({ content, entry, imageSize }) => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{ textAlign: 'center', fontSize: size.trim() }}>
        <ArticleRenderer
          toRender={content}
          entry={entry}
          imageSize={imageSize}
        />
      </div>
    )
  },

  IgnoreReadCount: ({ content, entry, imageSize }) => (
    // This is a hack to make the read count not increase
    // using "read counter does not count inside of code blocks"
    <ArticleRenderer toRender={content} entry={entry} imageSize={imageSize} />
  ),

  CenteringWithSizeBold: React.memo(({ content }) => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{ textAlign: 'center', fontSize: size.trim() }}>
        <strong>
          <ParseWithBudouX str={content} slug={content} />
        </strong>
      </div>
    )
  }),

  DangerouslySetInnerHtml: React.memo(({ content }) => (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  )),

  ZeroPadding: React.memo(({ content, entry, imageSize }) => (
    // This component is used to remove the padding of the parent component
    // See also: @blog/_lib/parse.ts
    <ArticleRenderer toRender={content} entry={entry} imageSize={imageSize} />
  )),
} as const satisfies Record<string, IsomorphicArticleParts>
/* eslint-enable react/display-name */

export type MarkdownComponentName<Format extends 'kebab' | 'camel'> =
  Format extends 'camel'
    ? keyof typeof myMarkdownClasses
    : Format extends 'kebab'
    ? CamelToKebabCase<keyof typeof myMarkdownClasses>
    : never

export function OriginalMarkdownComponent(
  props: IsomorphicArticlePartsProps & {
    componentName: keyof typeof myMarkdownClasses
  },
) {
  const { componentName, ...rest } = props
  const TargetComponent = myMarkdownClasses[props.componentName]
  return <TargetComponent {...rest} />
}
