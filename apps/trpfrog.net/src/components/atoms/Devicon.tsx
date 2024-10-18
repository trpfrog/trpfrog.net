import React from 'react'

import 'devicon'
import { twMerge } from '@/lib/tailwind/merge'

const deviconMap = {
  Python: 'devicon-python-plain',
  PyTorch: 'devicon-pytorch-original',
  TypeScript: 'devicon-typescript-plain',
  'Google Cloud': 'devicon-googlecloud-plain',
  'Twitter API': 'devicon-twitter-original',
  Twitter4J: 'devicon-twitter-original',
  React: 'devicon-react-original',
  'Next.js': 'devicon-nextjs-plain',
  'Node.js': 'devicon-nodejs-plain',
  JavaScript: 'devicon-javascript-plain',
  OpenGL: 'devicon-opengl-plain',
  'C++': 'devicon-cplusplus-plain',
  HTML: 'devicon-html5-plain',
  CSS: 'devicon-css3-plain',
  Docker: 'devicon-docker-plain',
  Processing: 'devicon-processing-plain',
  Java: 'devicon-java-plain',
  'C programming': 'devicon-c-plain',
  SCSS: 'devicon-sass-original',
  Rust: 'devicon-rust-plain',
  Bun: 'devicon-bun-plain',
  'GitHub Actions': 'devicon-githubactions-plain',
  'GitHub Pages': 'devicon-github-plain',
}

type DeviconKey = keyof typeof deviconMap

export function hasDevicon(iconName: string): iconName is DeviconKey {
  return iconName in deviconMap
}

type DeviconProps = {
  iconName: DeviconKey
  colored?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Devicon(props: DeviconProps) {
  return (
    <span
      style={props.style}
      className={twMerge(deviconMap[props.iconName], props.colored && 'colored', props.className)}
    />
  )
}
