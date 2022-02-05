/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        title: 'つまみネット',
        twitterId: '@TrpFrog',
    },
    images: {
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/trpfrog/image/upload/'
    },

    async redirects() {
        return [
            {
                source: '/:path*/index.html',
                destination: '/:path*',
                permanent: true
            },
            {
                source: '/medipro-game/:path*',
                destination: 'https://trpfrog.github.io/medipro-game/:path*',
                permanent: true
            },
            {
                source: '/notes',
                destination: '/blog',
                permanent: true
            },
            {
                source: '/notes/:path*',
                destination: '/blog/entry/:path*',
                permanent: true
            }
        ]
    }
}
