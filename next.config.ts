import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Développement seulement : autorise un téléphone du réseau local
  // (ex. http://192.168.1.184:3000/pro/fr) à charger les scripts du serveur
  // de dev. Sans effet en production.
  allowedDevOrigins: ["192.168.*.*"],
  // La racine "/" sert le français en interne via app/[lang]/, sans
  // rediriger : l'URL reste "/" pour le visiteur et les liens existants.
  async rewrites() {
    return [{ source: "/", destination: "/fr" }];
  },
};

export default nextConfig;
