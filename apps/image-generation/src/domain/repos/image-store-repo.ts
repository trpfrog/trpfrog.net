export interface ImageStoreRepo {
  upload: (filename: string, imageData: ArrayBuffer) => Promise<string> // 戻り値はURI
  download: (filename: string) => Promise<ArrayBuffer> // 画像データを取得
  hardDelete: (filename: string) => Promise<void> // 画像データを削除
}
