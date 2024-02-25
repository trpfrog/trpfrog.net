module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // eslint-disable-next-line n/no-process-env
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
