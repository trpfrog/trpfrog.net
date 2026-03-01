/**
 * Create a block for twitter-archived.
 *
 * Usage: First, copy the URL of the tweet you want to create a block for, then run the following command.
 * $ bun tools/create-tweet-block.ts
 */

import clipboardy from 'clipboardy'

import { createTweetBlockFromUrl } from '../src/routes/create-tweet-block/lib'

async function createTweetBlock(url: string): Promise<void> {
  const resultCodeBlock = await createTweetBlockFromUrl(url)
  console.log(resultCodeBlock)
  clipboardy.writeSync(resultCodeBlock)
}

const url = process.argv[2]
if (url) {
  void createTweetBlock(url)
} else {
  const url = clipboardy.readSync()
  void createTweetBlock(url)
}
