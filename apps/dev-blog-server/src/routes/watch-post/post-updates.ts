export type PostUpdateHub = {
  publish: (slug: string) => void
  subscribe: (subscriber: (slug: string) => void) => () => void
}

export function createPostUpdateHub(): PostUpdateHub {
  const subscribers = new Set<(slug: string) => void>()

  return {
    publish(slug) {
      subscribers.forEach(subscriber => subscriber(slug))
    },
    subscribe(subscriber) {
      subscribers.add(subscriber)
      return () => {
        subscribers.delete(subscriber)
      }
    },
  }
}
