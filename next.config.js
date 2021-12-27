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
    }
}
