// write queue test in jest

import { Queue } from '@/lib/queue'

describe('Queue', () => {
  let queue: Queue<number>

  beforeEach(() => {
    queue = new Queue<number>()
  })

  test('newly created queue should have size 0', () => {
    expect(queue.size).toBe(0)
  })

  test('push method should increase the size by 1', () => {
    queue.push(5)
    expect(queue.size).toBe(1)
    queue.push(10)
    expect(queue.size).toBe(2)
  })

  test('pop method should remove and return the first element of the queue', () => {
    queue.push(5)
    queue.push(10)
    const removed = queue.pop()
    expect(removed).toBe(5)
    expect(queue.size).toBe(1)
  })

  test('pop method should return null if the queue is empty', () => {
    const removed = queue.pop()
    expect(removed).toBeNull()
    expect(queue.size).toBe(0)
  })

  test('first and last properties should be updated correctly after pushing and popping', () => {
    queue.push(5)
    queue.push(10)
    queue.push(15)
    expect(queue.first).toBe(5)
    expect(queue.last).toBe(15)
    queue.pop()
    expect(queue.first).toBe(10)
    expect(queue.last).toBe(15)
    queue.pop()
    expect(queue.first).toBe(15)
    expect(queue.last).toBe(15)
  })

  test('pop method should update first and last properties correctly when queue becomes empty', () => {
    queue.push(5)
    queue.pop()
    expect(queue.first).toBeNull()
    expect(queue.last).toBeNull()
  })

  test('pop method should update first and last properties correctly when there is only one element in the queue', () => {
    queue.push(5)
    queue.pop()
    queue.push(10)
    expect(queue.first).toBe(10)
    expect(queue.last).toBe(10)
  })

  describe('first/last properties should be same when there is only one element in the queue', () => {
    test('push only', () => {
      queue.push(5)
      expect(queue.first).toBe(5)
      expect(queue.last).toBe(5)
    })

    test('push/pop', () => {
      queue.push(3)
      queue.push(5)
      queue.pop()
      expect(queue.first).toBe(5)
      expect(queue.last).toBe(5)
    })
  })
})
