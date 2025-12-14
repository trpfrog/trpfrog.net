import {
  brokenBalloonImagePath,
  normalBalloonImagePaths,
  trembleBalloonImagePaths,
} from './constants'

export function PreloadBalloonImages() {
  return (
    <head>
      {normalBalloonImagePaths.map(path => (
        <link key={path} rel="preload" as="image" href={path} />
      ))}
      {trembleBalloonImagePaths.map(path => (
        <link key={path} rel="preload" as="image" href={path} />
      ))}
      <link rel="preload" as="image" href={brokenBalloonImagePath} />
    </head>
  )
}
