import { PrismaClient, Tweet, Media } from '@prisma/client'
import fs from 'node:fs';
import {homedir} from "node:os";

type NumberString = string;
type OriginalTweet = {
  tweet: {
    edit_info: any;
    retweeted: boolean;
    source: string;
    entities: {
      user_mentions: {
        name: string;
        screen_name: string;
        id_str: NumberString;
      }[];
      media: OriginalMedia[]
    };
    display_text_range: NumberString[];
    favorite_count: NumberString;
    id_str: NumberString;
    truncated: NumberString;
    retweet_count: NumberString;
    id: NumberString;
    possibly_sensitive: boolean;
    created_at: string;
    favorited: boolean;
    full_text: string;
    lang: string
  }
};

type OriginalMedia = {
  media_url_https: string;
  sizes: {
    large: {
      w: number;
      h: number;
    }
  };
  type: string;
  id_str: string;
}

const prisma = new PrismaClient()

function simplifyTweet(tweet: OriginalTweet): [Tweet, Media[]] {
  const {
    id_str,
    created_at,
    full_text,
    entities,
    retweet_count,
    favorite_count,
    source: sourceHTML,
  } = tweet.tweet;
  const { name, screen_name } = entities?.user_mentions[0] ?? {
    name: null,
    screen_name: null,
  };
  const isRetweet = full_text.startsWith('RT @') && screen_name != null
  const user = isRetweet ? {
    name: name ?? 'つまみ',
    screenName: screen_name ?? 'TrpFrog',
  } : {
    name: 'つまみ',
    screenName: 'TrpFrog',
  }

  const source = sourceHTML.replace(/<a href="(.+)" rel="nofollow">(.+)<\/a>/, '$2')

  const tweetRecord: Tweet =  {
    id: id_str,
    createdAt: new Date(created_at),
    text: isRetweet ? full_text.replace(/^RT @\w+: /, '') : full_text,
    isRetweet,
    ...user,
    favs: parseInt(favorite_count ?? '0', 10),
    retweets: parseInt(retweet_count ?? '0', 10),
    source,
  }

  const mediaRecord: Media[] = (entities?.media ?? []).map(m => ({
    url: m.media_url_https,
    width: parseInt((m.sizes.large.w ?? '0') + '', 10),
    height: parseInt((m.sizes.large.h ?? '0') + '', 10),
    type: m.type,
    id: m.id_str + '-' + id_str,
    tweetId: id_str,
  })) ?? []


  return [tweetRecord, mediaRecord]
}

function fetchSimplifiedTweetsFromLocal(files: string[]): [Tweet[], Media[]] {
  let tweets: Tweet[] = [];
  let medias: Media[] = [];
  for (const fname of files) {
    const jsLines = fs.readFileSync(fname.replace('~', homedir()), 'utf8').split('\n');
    // REPLACE first line with '['
    const jsons: OriginalTweet[] = JSON.parse('[' + jsLines.slice(1).join('\n'));
    for (const json of jsons) {
      const [tweet, media] = simplifyTweet(json);
      tweets.push(tweet);
      medias.push(...media);
    }
  }

  tweets = tweets.sort((a, b) => a.id.localeCompare(b.id))
  for (let i = 0; i < tweets.length - 1; i++) {
    if (tweets[i].id === tweets[i + 1].id) {
      console.error('duplicate tweet id', tweets[i].id)
      process.exit(1)
    }
  }
  medias = medias.sort((a, b) => a.id.localeCompare(b.id))
  for (let i = 0; i < medias.length - 1; i++) {
    if (medias[i].id === medias[i + 1].id) {
      console.error('duplicate media id', medias[i].id)
      process.exit(1)
    }
  }

  return [tweets, medias]
}

async function main() {
  const [tweets, medias] = fetchSimplifiedTweetsFromLocal([
    '~/Twitter/data/tweets.js',
    '~/Twitter/data/tweets-part1.js',
    '~/Twitter/data/tweets-part2.js',
  ]);

  await prisma.$transaction([
    prisma.tweet.deleteMany(),
    prisma.media.deleteMany(),
  ])

  await prisma.tweet.createMany({ data: tweets }).catch(e => {
    console.error(e)
    process.exit(1)
  })

  await prisma.media.createMany({ data: medias }).catch(e => {
    console.error(e)
    process.exit(1)
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
