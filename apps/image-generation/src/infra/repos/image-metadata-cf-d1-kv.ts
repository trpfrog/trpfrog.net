import { desc, eq, or, and, like, count } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { getContext } from 'hono/context-storage'

import { ImageMetadata, parseImageMetadata } from '../../domain/entities/generation-result'
import {
  ImageMetadataRepo,
  imageMetadataRepoQuerySchema,
} from '../../domain/repos/image-metadata-repo'
import { Env } from '../../env'
import { imageMetadataTable as images } from '../db/image-db'

const CURRENT_KEY = 'latest'

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

export const imageMetadataRepoCloudflareD1WithKV: ImageMetadataRepo = {
  async query(query) {
    const { prompt, limit, offset } = imageMetadataRepoQuerySchema.parse(query)
    const tokens = prompt ? prompt.split(/\s+/) : []
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    const res = await db
      .select()
      .from(images)
      .where(
        and(
          ...tokens.map(token =>
            or(like(images.promptText, `%${token}%`), like(images.promptTranslated, `%${token}%`)),
          ),
        ),
      )
      .offset(offset)
      .limit(limit)
    return res.map(convertToDomain)
  },

  async getLatest() {
    const c = getContext<Env>()
    try {
      // Try to fetch the latest image from the KV store
      const rawJson = await c.env.DIFFUSION_KV.get(CURRENT_KEY)
      if (rawJson) {
        const dbRecord = JSON.parse(rawJson) as typeof images.$inferSelect
        return convertToDomain(dbRecord)
      }
    } catch (error) {
      console.error('Error fetching or parsing latest image', error)
    }

    // Fallback to database if KV store fetch fails or no data found
    const db = drizzle(c.env.DATABASE)
    const [record] = await db.select().from(images).orderBy(desc(images.createdAtMillis)).limit(1)

    // Update the KV store with the latest image
    if (record) {
      c.env.DIFFUSION_KV.put(CURRENT_KEY, JSON.stringify(record)).catch(error => {
        console.error('Error updating latest image in KV store', error)
      })
    }

    return record ? convertToDomain(record) : undefined
  },

  async amount() {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)
    const res = await db.select({ count: count() }).from(images)
    return res[0].count
  },

  async add(imageMetadata) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)

    const record = convertToDB(imageMetadata)
    await Promise.all([
      db.insert(images).values(record),
      c.env.DIFFUSION_KV.put(CURRENT_KEY, JSON.stringify(record)),
    ])
  },

  async remove(id) {
    const c = getContext<Env>()
    const db = drizzle(c.env.DATABASE)

    await Promise.all([
      db.delete(images).where(eq(images.id, id)),
      // Anyways, remove the latest image from the KV store.
      // The cache is restored on the next `getLatest` call.
      c.env.DIFFUSION_KV.delete(CURRENT_KEY),
    ])
  },
}
