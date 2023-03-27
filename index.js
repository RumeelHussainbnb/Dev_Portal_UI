const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'https://bnbdev.community' : 'https://staging.bnbdev.community';
