import fs from 'fs';
import path from 'path';

export type MyLinkRecord = {
    url: string,
    siteName: string,
    description: string
}

export const getMyLinkRecords: () => Promise<MyLinkRecord[]> = async () => {
    const jsonPath = path.join(process.cwd(), 'data', 'my_links.json');
    const jsonText = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(jsonText) as MyLinkRecord[];
}