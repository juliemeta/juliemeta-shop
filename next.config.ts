const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eudaimeta.dk",
      },
      {
        protocol: "https",
        hostname: "www.eudaimeta.dk",
      },
    ],
  },
};

module.exports = nextConfig;
