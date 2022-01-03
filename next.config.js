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
                source: '/medipro-game/:path*',
                destination: 'https://trpfrog.github.io/medipro-game/:path*',
                permanent: true
            },
            {
                source: '/notes/:path*',
                destination: 'https://old.trpfrog.net/notes/:path*',
                permanent: false
            }
        ]
    }
}
