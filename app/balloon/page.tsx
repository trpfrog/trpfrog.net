// 'use client';
import BalloonApp from "./BalloonApp";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Balloon',
  description: '🎈💥🎈💥🎈💥🎈💥🎈'
}

export default async function Index() {
  return (
    <div id="main_wrapper">
      <BalloonApp/>
    </div>
  )
}
