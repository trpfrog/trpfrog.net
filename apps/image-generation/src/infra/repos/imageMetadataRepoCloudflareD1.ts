import { desc, eq, or, and, like, count, isNull } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { getContext } from 'hono/context-storage'

import { ImageMetadata, parseImageMetadata } from '../../domain/entities/generation-result'
import { ImageMetadataQuery, ImageMetadataRepo } from '../../domain/repos/image-metadata-repo'
import { Env } from '../../env'
import { imageMetadataTable as images } from '../db/schema'

function convertToDomain(r: typeof images.$inferSelect): ImageMetadata {
  return parseImageMetadata({
    id: r.id,
    imageUri: r.imageUri,
    modelName: r.modelName,
    prompt: {
      text: r.promptText,
      translated: r.promptTranslated,
      author: r.author,
    },
    createdAt: new Date(r.createdAtMillis),
    deletedAt: r.deletedAt ? new Date(r.deletedAt) : undefined,
  })
}

function convertToDB(image: ImageMetadata): typeof images.$inferInsert {
  return {
    id: image.id,
    imageUri: image.imageUri,
    modelName: image.modelName,
    promptText: image.prompt.text,
    promptTranslated: image.prompt.translated,
    author: image.prompt.author,
    createdAtMillis: image.createdAt.getTime(),
  }
}

function createWhereQuery(query: ImageMetadataQuery['where']) {
  const { prompt } = query
  const tokens = prompt ? prompt.split(/\s+/) : []
  return and(
    ...tokens.map(token =>
      or(like(images.promptText, `%${token}%`), like(images.promptTranslated, `%${token}%`)),
    ),
    query.includeDeleted ? undefined : isNull(images.deletedAt),
  )
}

export const imageMetadataRepoCloudflareD1: ImageMetadataRepo = {
  async query(query) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    const res = await db
      .select()
      .from(images)
      .where(createWhereQuery(query.where))
      .orderBy(desc(images.createdAtMillis))
      .offset(query.offset)
      .limit(query.limit)
    return res.map(convertToDomain)
  },

  async getLatest() {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    const [record] = await db
      .select()
      .from(images)
      .where(isNull(images.deletedAt))
      .orderBy(desc(images.createdAtMillis))
      .limit(1)
    return record ? convertToDomain(record) : undefined
  },

  async count(query = {}) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    const res = await db.select({ count: count() }).from(images).where(createWhereQuery(query))
    return res[0].count
  },

  async add(imageMetadata) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    const record = convertToDB(imageMetadata)
    await db.insert(images).values(record)
  },

  async hardDelete(id) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    await db.delete(images).where(eq(images.id, id))
  },

  async softDelete(id) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    await db.update(images).set({ deletedAt: Date.now() }).where(eq(images.id, id))
  },

  async undelete(id) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    await db.update(images).set({ deletedAt: null }).where(eq(images.id, id))
  },
}
