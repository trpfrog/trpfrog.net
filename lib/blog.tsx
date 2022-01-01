import {createClient, Entry} from "contentful";
import {Document} from "@contentful/rich-text-types";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY!
});

export type BlogPost = {
    title: string,
    slug: string,
    heroImage: object,
    description: string,
    body: Document,
    bodyMarkdown: string,
    publishDate: string,
    tags: string[]
}

export const getAllPosts = async () => {
    const query = {
        limit: 10,
        include: 0,
        content_type: 'article',
    }
    const pages = await client.getEntries(query);
    return pages.items as Entry<BlogPost>[] || null;
}

export const getPost = async (slug: string) => {
    const query = {
        limit: 1,
        include: 10,
        locale: 'ja-JP',
        'fields.slug': slug,
        content_type: 'article',
    }
    const { items: [page] } = await client.getEntries(query);
    return page as Entry<BlogPost> || null;
}