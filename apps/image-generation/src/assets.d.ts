// Vite の `?inline` は、ファイルの中身を data URL の文字列としてバンドルに埋め込む
declare module '*?inline' {
  const dataUrl: string
  // oxlint-disable-next-line eslint/no-restricted-exports -- Vite の `?inline` は default export で値を公開する
  export default dataUrl
}

// Vite の `?raw` は、ファイルの中身を文字列としてバンドルに埋め込む
declare module '*?raw' {
  const content: string
  // oxlint-disable-next-line eslint/no-restricted-exports -- Vite の `?raw` は default export で値を公開する
  export default content
}
