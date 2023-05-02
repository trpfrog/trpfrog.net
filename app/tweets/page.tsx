import {Metadata} from "next";
import Title from "../../components/Title";
import React from "react";
import TweetCard from "./TweetCard";
import { PrismaClient, Tweet, Media } from '@prisma/client'

const prisma = new PrismaClient()

export const metadata = {
  title: 'ツイートデータベース',
  description: 'つまみさんのツイートです',
  robots: {
    index: false,
    follow: false,
  }
} satisfies Metadata

export default async function Index() {
  const tweets = await prisma.tweet.findMany({
    take: 100,
    orderBy: {
      createdAt: 'desc'
    },
  })
  return (
    <div id="main_wrapper">
      <Title title={'Tweets'}>
        <p>
          {metadata.description}
        </p>
      </Title>
      <div>
        {
          tweets.slice(10).map((tweet) => {
            return (
              <React.Fragment key={tweet.id}>
                <TweetCard tweet={tweet} />
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}
