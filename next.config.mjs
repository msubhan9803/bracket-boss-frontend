/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  images: {
    domains: ['i.pravatar.cc'],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config = withBundleAnalyzer(nextConfig);

export default config;
