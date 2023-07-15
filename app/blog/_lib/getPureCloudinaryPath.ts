export const getPureCloudinaryPath = (path: string) => {
  const cloudinaryUrl = 'https:\/\/res.cloudinary.com\/trpfrog'
  return (path ?? '')
    .replace(/\/image\/upload\/v[0-9]+/, '')
    .replace(/\/image\/upload/, '')
    .replace(cloudinaryUrl, '')
    .split('.')[0] // remove extension
}
