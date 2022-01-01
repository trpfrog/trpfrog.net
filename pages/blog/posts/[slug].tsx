import React from 'react'
import {GetStaticProps, NextPage} from "next";
import {Entry} from 'contentful'
import Link from 'next/link'
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Block from "../../../components/Block";
import {getAllPosts, BlogPost, getPost} from "../../../lib/blog";

import ReactMarkdown from "react-markdown";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

type PageProps = {
    entry: Entry<BlogPost>
}

type Params = {
    slug: string
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({params}) => {
    const entry = await getPost(params!.slug);
    return {
        props: {
            entry: entry
        }
    }
}

export const getStaticPaths = async () => {
    const allPosts = await getAllPosts();
    return {
        paths: allPosts?.map(entry => `/blog/posts/${entry.fields.slug}`) ?? [],
        fallback: true
    }
}


const Article: NextPage<PageProps> = ({ entry }) => {
    return (
        <Layout>
            <Title title={entry.fields.title}>
                {entry.fields.description}
                {entry.fields.publishDate}
            </Title>
            <Link href={'/blog'}>
                <a className={'linkButton'}>戻る</a>
            </Link>
            <Block>
                <div>
                    {documentToReactComponents(entry.fields.body)}
                </div>
                <ReactMarkdown>
                    {entry.fields.bodyMarkdown}
                </ReactMarkdown>
            </Block>
        </Layout>
    )
}

export default Article