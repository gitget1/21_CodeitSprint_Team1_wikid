import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   // 2. Webpack 환경(기존)을 위한 설정
  webpack(config) {
    // 기존 svg 처리 로더 찾기
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    // svg 제외
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // svgr 적용
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;