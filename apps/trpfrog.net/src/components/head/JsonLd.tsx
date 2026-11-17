type JsonLdProps = {
  data: Record<string, unknown>
}

/** 構造化データ (JSON-LD) を埋め込む */
export function JsonLd({ data }: JsonLdProps) {
  // `</script>` で script 要素が閉じられないよう `<` をエスケープする
  const json = JSON.stringify(data).replaceAll('<', '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
