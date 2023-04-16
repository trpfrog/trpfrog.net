export default function cloudinaryLoader({ src, width, quality }: any) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  if (src.startsWith('/')) {
    src = src.substring(1)
  }
  return `https://res.cloudinary.com/trpfrog/image/upload/${params.join(',')}/${src}`
}
