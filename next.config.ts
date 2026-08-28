import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La racine "/" sert le français en interne via app/[lang]/, sans
  // rediriger : l'URL reste "/" pour le visiteur et les liens existants.
  async rewrites() {
    return [{ source: "/", destination: "/fr" }];
  },
};

export default nextConfig;
