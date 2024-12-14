import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// テーブル定義
export const imageMetadataTable = sqliteTable('images_metadata', {
  id: text('id').primaryKey(), // 主キー
  author: text('author').notNull(), // 必須の文字列
  promptText: text('prompt_text').notNull(), // `prompt.text` を格納
  promptTranslated: text('prompt_translated').notNull(), // `prompt.translated` を格納
  modelName: text('model_name').notNull(), // モデル名
  createdAtMillis: integer('created_at_millis').notNull(), // タイムスタンプ（ミリ秒）
  imageUri: text('image_uri').notNull(), // 画像のURI
})
