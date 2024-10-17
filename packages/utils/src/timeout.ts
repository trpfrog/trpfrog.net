export function withTimeout<T>(promise: Promise<T>, timeoutMillis: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`The process did not complete within ${timeoutMillis}ms.`))
    }, timeoutMillis)

    promise
      .then(result => {
        clearTimeout(timer)
        resolve(result)
      })
      .catch(error => {
        clearTimeout(timer)
        reject(error)
      })
  })
}
