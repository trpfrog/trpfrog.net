import fs from 'fs';
import path from 'path';
import dayjs from "dayjs";
import {getSortedPostsData} from "./blog/load";

export type WhatsNewRecord = {
    type: 'page' | 'fix' | 'improve' | 'blog' | 'content',
    text: string,
    date: string
}

export const getWhatsNewRecords: () => Promise<WhatsNewRecord[]> = async () => {
    const jsonPath = path.join(process.cwd(), 'data', 'whats_new.json');
    const jsonText = fs.readFileSync(jsonPath, 'utf-8');
    const records = JSON.parse(jsonText) as WhatsNewRecord[];

    const blogData = await getSortedPostsData()

    for (const post of blogData) {
        records.push({
            type: 'blog',
            text: `記事「[${post.title}](https://trpfrog.net/blog/${post.slug})」を公開しました！`,
            date: dayjs(post.date).format('YYYY-MM-DD')
        })
    }

    return records.sort((a, b) => {
        if(a.date === b.date) return 0
        return a.date < b.date ? 1 : -1
    })
}
