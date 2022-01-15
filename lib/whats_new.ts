import fs from 'fs';
import path from 'path';

export type WhatsNewRecord = {
    type: 'page' | 'fix' | 'improve' | 'blog' | 'content',
    text: string,
    date: string
}

export const getWhatsNewRecords: () => Promise<WhatsNewRecord[]> = async () => {
    const jsonPath = path.join(process.cwd(), 'data', 'whats_new.json');
    const jsonText = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(jsonText) as WhatsNewRecord[];
}
