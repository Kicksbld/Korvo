import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Routage de la page pro (pro.korvo-studio.fr).

   La page pro vit dans src/app/pro/[lang]/ mais n'est servie que sur son
   sous-domaine, sans le préfixe /pro dans l'URL :

     pro.korvo-studio.fr/        → réécrit vers /pro/fr
     pro.korvo-studio.fr/en      → réécrit vers /pro/en
     pro.korvo-studio.fr/fr…     → 308 vers la même URL sans /fr (le français
                                    vit à la racine, pas de doublon)
     pro.korvo-studio.fr/api/…   → réécrit vers /pro/api/… (assistant, phase 5)

   Sur le domaine principal (et en local sur localhost), /pro/* redirige en
   308 vers le sous-domaine, pour qu'aucun contenu n'existe en double.

   Ordre d'exécution (proxy.md) : le proxy passe avant les rewrites de
   next.config.ts. La réécriture "/" → "/fr" du portfolio est un rewrite
   afterFiles : sur le sous-domaine, "/" est déjà devenu "/pro/fr" et elle ne
   s'applique pas. Sur le domaine principal, le proxy laisse passer "/" et le
   portfolio est inchangé.

   Hors production et hors localhost (aperçus Vercel en *.vercel.app), il n'y a
   pas de sous-domaine : /pro/fr et /pro/en restent servis tels quels, et /pro
   est réécrit vers /pro/fr pour pouvoir relire la page. */

const MAIN_HOSTS = new Set(["korvo-studio.fr", "www.korvo-studio.fr"]);
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

function splitHost(host: string): { hostname: string; port: string } {
  const [hostname, port = ""] = host.split(":");
  return { hostname: hostname.toLowerCase(), port };
}

function isProHost(hostname: string): boolean {
  return hostname.startsWith("pro.");
}

/** Chemin public (sur le sous-domaine) d'un chemin interne /pro/…. */
function publicPathFromPro(pathname: string): string {
  const rest = pathname.replace(/^\/pro(?=\/|$)/, "") || "/";
  if (rest === "/fr" || rest.startsWith("/fr/")) return rest.slice(3) || "/";
  return rest;
}

/** URL absolue sur l'hôte réellement demandé (en-tête Host), pour que les
 *  redirections restent sur le sous-domaine quel que soit l'URL interne. */
function redirectOnHost(request: NextRequest, hostname: string, port: string, pathname: string) {
  const url = request.nextUrl.clone();
  url.hostname = hostname;
  url.port = port;
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { hostname, port } = splitHost(request.headers.get("host") ?? request.nextUrl.host);

  /* ── Sur le sous-domaine pro ─────────────────────────────── */
  if (isProHost(hostname)) {
    // Le français est la langue par défaut, servie à la racine.
    if (pathname === "/fr" || pathname.startsWith("/fr/")) {
      return redirectOnHost(request, hostname, port, pathname.slice(3) || "/");
    }

    // Accès direct au chemin interne : on renvoie vers l'URL publique.
    if (pathname === "/pro" || pathname.startsWith("/pro/")) {
      return redirectOnHost(request, hostname, port, publicPathFromPro(pathname));
    }

    const url = request.nextUrl.clone();
    if (pathname.startsWith("/api/")) {
      url.pathname = `/pro${pathname}`;
    } else if (pathname === "/en" || pathname.startsWith("/en/")) {
      url.pathname = `/pro${pathname}`;
    } else {
      url.pathname = `/pro/fr${pathname === "/" ? "" : pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  /* ── Sur tout autre hôte : seul /pro/* est concerné ───────── */
  if (pathname !== "/pro" && !pathname.startsWith("/pro/")) {
    return NextResponse.next();
  }

  const isMain = MAIN_HOSTS.has(hostname);
  const isLocal = LOCAL_HOSTNAMES.has(hostname);

  if (isMain || isLocal) {
    const proHostname = isMain ? "pro.korvo-studio.fr" : "pro.localhost";
    const target = new URL(request.nextUrl.toString());
    target.protocol = isMain ? "https:" : target.protocol;
    target.hostname = proHostname;
    target.port = isLocal ? port : "";
    target.pathname = publicPathFromPro(pathname);
    target.search = search;
    return NextResponse.redirect(target, 308);
  }

  // Aperçus (pas de sous-domaine) : /pro → /pro/fr, le reste tel quel.
  if (pathname === "/pro") {
    const url = request.nextUrl.clone();
    url.pathname = "/pro/fr";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /* Tout sauf les fichiers internes de Next et les fichiers statiques
       (tout chemin qui se termine par une extension : images de public/,
       favicon, robots.txt, sitemap.xml…). */
    "/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
