export class Queue<T> {
  size: number
  items: T[]
  first: T | null
  last: T | null

  constructor() {
    this.size = 0
    this.items = []
    this.first = null
    this.last = null
  }

  push(item: T) {
    this.items.push(item)
    this.last = item
    this.first = this.items[0] ?? null
    this.size++
  }

  pop() {
    this.size = Math.max(0, this.size - 1)
    const removed = this.items.shift() ?? null
    this.last = this.items[this.size - 1] ?? null
    this.first = this.items[0] ?? null
    return removed
  }
}
