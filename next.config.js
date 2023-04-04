/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  experimental: {
    scrollRestoration: true
  },
  env: {
    HOME_URL: process.env.SITE_URL
  },
  swcMinify: true,
  reactStrictMode: false,
  images: {
    domains: [
      'cdn.hashnode.com',
      'cdn.pixabay.com',
      'pbs.twimg.com',
      'cardea.imgix.net',
      'i.ytimg.com',
      'images.unsplash.com',
      'static-cdn.jtvnw.net',
      'clips-media-assets2.twitch.tv',
      'www.youtube.com',
      'pbs.twimg.com',
      'opengraph.githubassets.com',
      'res.cloudinary.com',
      'repository-images.githubusercontent.com',
      'figment.io',
      'lorisleiva.com',
      'www.notion.so',
      'dev.to',
      'twitter.com',
      'alexgr.in',
      'avatars.githubusercontent.com',
      'www.gravatar.com',
      'api.typedream.com',
      'blog.neodyme.io',
      'lh4.googleusercontent.com',
      'www.jpmti2016.com',
      'www.crossmint.io',
      'binance.ghost.io',
      'docs.bnbchain.org',
      'i3.ytimg.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh6.googleusercontent.com',
      'lh6.googleusercontent.com',
      't.me',
      'bnbchain.org',
      'discord.com',
      'corite.com',
      'miro.medium.com',
      'miro.medium.com/max',
      'medium.com',
      'encrypted-tbn0.gstatic.com',
      'asdjasdas',
      'images.pexels.com',
      'www.svgrepo.com',
      'img.youtube.com',
      'public.bnbstatic.com',
      'bnbchain-dev-s3.s3.ap-northeast-1.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp']
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/library'
      }
    ];
  }
};

module.exports = moduleExports;
