import type { DevOriginResolver } from './defineServices'

/**
 * portless (https://github.com/vercel-labs/portless) で dev サーバを立てるときの DevOriginResolver。
 * サービス名をそのまま portless の app 名として使う。
 *
 * @param portlessUrl portless が子プロセスに渡す `PORTLESS_URL`。portless を通さずに起動したときは undefined
 */
export function portlessDevOrigin(portlessUrl: string | undefined): DevOriginResolver {
  return (name, allNames) =>
    portlessUrl ? resolvePortlessOrigin(portlessUrl, allNames, name) : null
}

/**
 * portless で起動したプロセスの URL (`PORTLESS_URL`) から、
 * 同じ worktree で動いている別の app の origin を組み立てる。
 * portless は `<worktree>.<app 名>.localhost` のように app 名の前後へ worktree 名や TLD を足すので、
 * 自分の app 名の部分だけを差し替えればよい。
 *
 * @param appNames 自分を含む、portless に登録している app 名の一覧
 * @returns `portlessUrl` がどの app 名にも当たらなければ null
 */
export function resolvePortlessOrigin(
  portlessUrl: string,
  appNames: readonly string[],
  targetAppName: string,
): string | null {
  const url = new URL(portlessUrl)
  const labels = url.hostname.split('.')
  const match = appNames
    .map(appName => appName.split('.'))
    // `admin.trpfrog` と `trpfrog` が両方当たるときは長い方が自分
    .toSorted((a, b) => b.length - a.length)
    .map(appLabels => ({
      appLabels,
      index: labels.findIndex((_, i) => appLabels.every((label, j) => labels[i + j] === label)),
    }))
    .find(({ index }) => index !== -1)
  if (!match) return null

  url.hostname = [
    ...labels.slice(0, match.index),
    targetAppName,
    ...labels.slice(match.index + match.appLabels.length),
  ].join('.')
  return url.origin
}
