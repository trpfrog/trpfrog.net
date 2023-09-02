export function setTimeoutPromise<T>(fn: () => T, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, ms);
  });
}
