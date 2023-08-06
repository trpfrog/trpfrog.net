import React from "react";
import {AutoYoutube, Youtube} from "./article-parts/YouTube";
import TwitterArchived from "./article-parts/TwitterArchive";
import WalkingResultBox from "./article-parts/WalkingResultBox";
import ProfileCards from "./article-parts/ProfileCards";
import {Caution, Infobox, TitledFrame} from "./article-parts/HighlightedBoxes";
import HorizontalImages from "./article-parts/HorizontalImages";
import HorizontalScroll from "./article-parts/HorizontalScroll";
import Conversation from "./article-parts/Conversation";
import ShowAll from "./article-parts/ShowAll";
import {PageTransferButton} from "./PageNavigation";
import {parseWithBudouX} from "@/lib/wordSplit";
import ArticleRenderer from "@blog/_renderer/ArticleRenderer";
import {ArticleParts} from "./ArticleParts";
import {LinkEmbed} from "@blog/_components/article-parts/LinkEmbed";
import {Twitter} from "@blog/_components/article-parts/Twitter";


/* eslint-disable react/display-name */
const myMarkdownClasses = {
  // Socials
  Twitter,
  Youtube,
  AutoYoutube,
  LinkEmbed,
  TwitterArchived,

  // Walking Parts
  ResultBox: WalkingResultBox,
  ProfileCards: (({ content, entry }) => <ProfileCards content={content} held={entry?.held}/> ) as ArticleParts,

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

  Centering: ({ content, mdOptions }) => (
    <div style={{textAlign: 'center'}}>
      <ArticleRenderer toRender={content} markdownOptions={mdOptions}/>
    </div>
  ),

  CenteringWithSize: ({ content, mdOptions }) => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{textAlign: 'center', fontSize: size.trim()}}>
        <ArticleRenderer toRender={content} markdownOptions={mdOptions}/>
      </div>
    )
  },

  IgnoreReadCount: ({ content, mdOptions }) => (
    // This is a hack to make the read count not increase
    // using "read counter does not count inside of code blocks"
    <ArticleRenderer toRender={content} markdownOptions={mdOptions}/>
  ),

  CenteringWithSizeBold: React.memo(({ content }) => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{textAlign: 'center', fontSize: size.trim()}}>
        <strong>{parseWithBudouX(content, content)}</strong>
      </div>
    )
  }),

  DangerouslySetInnerHtml: React.memo(({ content }) => (
    <div dangerouslySetInnerHTML={{__html: content}}/>
  )),
} as const satisfies Record<string, ArticleParts>
/* eslint-enable react/display-name */

export default myMarkdownClasses;
