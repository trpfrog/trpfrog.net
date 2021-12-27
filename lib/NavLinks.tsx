import fs from 'fs';
import path from 'path';

export type NavLinkRecord = {
    link: string,
    name: string
}

export const getNavLinkRecords: () => Promise<NavLinkRecord[]> = async () => {
    const jsonPath = path.join(process.cwd(), 'data', 'nav_links.json');
    const jsonText = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(jsonText) as NavLinkRecord[];
}
