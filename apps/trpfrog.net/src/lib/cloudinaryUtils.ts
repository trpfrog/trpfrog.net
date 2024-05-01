/**
 * Cloudinary loader for Next.js Image component
 * @param src
 * @param width
 * @param quality
 */
export function cloudinaryLoader({ src, width, quality }: any) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  if (src.startsWith('/')) {
    src = src.substring(1)
  }
  return `https://res.cloudinary.com/trpfrog/image/upload/${params.join(',')}/${src}`
}

/**
 * Get pure cloudinary path from versioned path
 * @param path
 */
export function getPureCloudinaryPath(path: string) {
  const cloudinaryUrl = 'https://res.cloudinary.com/trpfrog'
  return (path ?? '')
    .replace(/\/image\/upload\/v[0-9]+/, '')
    .replace(/\/image\/upload/, '')
    .replace(cloudinaryUrl, '')
    .split('.')[0] // remove extension
}
