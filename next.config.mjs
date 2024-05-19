/** @type {import('next').NextConfig} */
const nextConfig = {

    // fs is not available in the browser, so we need to disable it, otherwise we get an error, JARL

    reactStrictMode: true,
    swcMinify: true,
  
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
  
      return config;
    },
};

export default nextConfig;
