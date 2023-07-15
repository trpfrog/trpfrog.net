import ArticleCard from "@/components/blog/ArticleCard";
import Block from "@/components/Block";
import styles from "../../../styles/blog/blog.module.scss";
import {RichEntryButtons} from "./EntryButtons";
import PageNavigation from "@/components/blog/PageNavigation";
import {HeaderFollowSticky} from "@/components/Header";
import React from "react";
import BlogPost from "@blog/lib/blogPost";

type Props = {
  post: BlogPost
}

export default function ArticleSidebar({ post }: Props) {
  return (
    <HeaderFollowSticky top={'1em'}>
      <ArticleCard
        entry={post}
        style={{
          pointerEvents: 'none',
          borderRadius: 30,
          marginBottom: '1em'
        }}
      />
      <Block className={styles.blog_side_bar} style={{padding: '1.5em 0.5em'}}>
        <div style={{transform: 'scale(0.9)', transformOrigin: 'top'}}>
          <RichEntryButtons post={post} extended={false}/>
          <div style={{height: '1em'}}/>
          <PageNavigation entry={post}/>
        </div>
      </Block>
    </HeaderFollowSticky>
  )
}
