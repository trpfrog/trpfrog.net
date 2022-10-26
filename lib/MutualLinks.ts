import fs from 'fs';
import path from 'path';

export type MutualLinkRecord = {
  url: string,
  siteName: string,
  ownerName: string,
  twitterId: string,
  description: string
}

export const getMutualLinkRecords: () => Promise<MutualLinkRecord[]> = async () => {
  const jsonPath = path.join(process.cwd(), 'data', 'mutual_links.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const links = JSON.parse(jsonText) as MutualLinkRecord[];

  return links.sort(({ownerName: a}, {ownerName: b}) => {
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } else {
      return 0
    }
  });
}
