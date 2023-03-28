import {BlogPost} from "./load";
import {BlogImageData} from "./imagePropsFetcher";
import React from "react";
import {AutoYoutube, LinkEmbed, Twitter, Youtube} from "../../components/blog/article-parts/Socials";
import TwitterArchived from "../../components/blog/article-parts/TwitterArchive";
import {ResultBox} from "../../components/blog/article-parts/WalkingParts";
import ProfileCards from "../../components/blog/article-parts/ProfileCards";
import {Caution, Infobox, TitledFrame} from "../../components/blog/article-parts/HighlightedBoxes";
import HorizontalImages from "../../components/blog/article-parts/HorizontalImages";
import HorizontalScroll from "../../components/blog/article-parts/HorizontalScroll";
import Conversation from "../../components/blog/article-parts/Conversation";
import ShowAll from "../../components/blog/article-parts/ShowAll";
import {PageTransferButton} from "../../components/blog/PageNavigation";
import {parseWithBudouX} from "../wordSplit";
import {ArticleRenderer} from "../../app/blog/[...slug]/BlogMarkdown";

export type ArticleParts = (
  content: string,
  entry?: BlogPost,
  imageSize?: { [path: string]: BlogImageData }
) => React.ReactNode

type MarkdownFunctionType = { [content: string]: ArticleParts }

const myMarkdownClasses: MarkdownFunctionType = {

  // Socials
  Twitter,
  Youtube,
  AutoYoutube,
  LinkEmbed,
  TwitterArchived,

  // Walking Parts
  ResultBox,
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


  Centering: (content, entry, imageSize) => (
    <div style={{textAlign: 'center'}}>
      <ArticleRenderer
        toRender={content}
        entry={entry}
        imageSize={imageSize}
        renderLaTeX={false}
      />
    </div>
  ),

  CenteringWithSize: (content, entry, imageSize) => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{textAlign: 'center', fontSize: size.trim()}}>
        <ArticleRenderer
          toRender={content}
          entry={entry}
          imageSize={imageSize}
          renderLaTeX={false}
        />
      </div>
    )
  },

  IgnoreReadCount: (content, entry, imageSize) => (
    <ArticleRenderer
      toRender={content}
      entry={entry}
      imageSize={imageSize}
      renderLaTeX={false}
    />
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
}

export default myMarkdownClasses;
