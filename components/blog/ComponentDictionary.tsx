'use client';

import React from "react";
import {AutoYoutube, LinkEmbed, Twitter, Youtube} from "./article-parts/Socials";
import TwitterArchived from "./article-parts/TwitterArchive";
import WalkingResultBox from "./article-parts/WalkingResultBox";
import ProfileCards from "./article-parts/ProfileCards";
import {Caution, Infobox, TitledFrame} from "./article-parts/HighlightedBoxes";
import HorizontalImages from "./article-parts/HorizontalImages";
import HorizontalScroll from "./article-parts/HorizontalScroll";
import Conversation from "./article-parts/Conversation";
import ShowAll from "./article-parts/ShowAll";
import {PageTransferButton} from "./PageNavigation";
import {parseWithBudouX} from "../../lib/wordSplit";
import ArticleRendererFromContext from "../../app/blog/renderer/ArticleRenderer";
import {ArticleParts} from "./ArticleParts";

const myMarkdownClasses = {
  // Socials
  Twitter,
  Youtube,
  AutoYoutube,
  LinkEmbed,
  TwitterArchived,

  // Walking Parts
  ResultBox: WalkingResultBox,
  ProfileCards: ((content, entry) => <ProfileCards content={content} held={entry?.held}/> ) as ArticleParts,

  // Highlight Boxes
  Caution,
  Infobox,

  TitledFrame,

  HorizontalImages,
  HorizontalScroll,
  Conversation,

  ShowAll,

  NextPage: (content, entry) => {
    if (!entry) return <></>
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{margin: '1em 0'}}>
          <PageTransferButton
            entry={entry}
            nextPage={entry.currentPage + 1}
            buttonText={`Next: ${content} →`}
          />
        </div>
      </div>
    )
  },

  Centering: content => (
    <div style={{textAlign: 'center'}}>
      <ArticleRendererFromContext toRender={content}/>
    </div>
  ),

  CenteringWithSize: content => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{textAlign: 'center', fontSize: size.trim()}}>
        <ArticleRendererFromContext toRender={content}/>
      </div>
    )
  },

  IgnoreReadCount: content => (
    // This is a hack to make the read count not increase
    // using "read counter does not count inside of code blocks"
    <ArticleRendererFromContext toRender={content}/>
  ),

  CenteringWithSizeBold: content => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{textAlign: 'center', fontSize: size.trim()}}>
        <strong>{parseWithBudouX(content, content)}</strong>
      </div>
    )
  },

  DangerouslySetInnerHtml: content => (
    <div dangerouslySetInnerHTML={{__html: content}}/>
  ),
} as const satisfies Record<string, ArticleParts>

export default myMarkdownClasses;
