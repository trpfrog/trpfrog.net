import path from "path";
import fs from "fs";

export type WalkingArticleRecord = {
    title: string,
    url: string,
    author: string,
    siteName: string,
    distance: string,
    date: Date
}

export const getWalkingArticleRecords: () => Promise<WalkingArticleRecord[]> = async () => {
    const jsonPath = path.join(process.cwd(), 'data', 'walking_articles.json');
    const jsonText = fs.readFileSync(jsonPath, 'utf-8');
    const links = JSON.parse(jsonText) as WalkingArticleRecord[];

    return links.sort(({date: a}, {date: b}) => {
        if(a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    });
}