export interface AssetsRepo {
  fetch: (path: string) => Promise<Response>
}
