/* Structure des textes de la page pro. fr.ts et en.ts implémentent ce type :
   TypeScript refuse toute clé manquante ou en trop dans l'une des langues.

   Phase 1 : seuls la barre du haut et le hero sont posés. Les autres sections
   sont ajoutées en phase 2. */

export interface ProContent {
  meta: {
    title: string;
    description: string;
  };
  header: {
    /** Nom accessible du logotype (lien vers le haut de page). */
    homeLabel: string;
    /** Nom accessible du sélecteur de langue. */
    langLabel: string;
    /** Nom complet de chaque langue, lu par les lecteurs d'écran. */
    langNames: { fr: string; en: string };
    portfolio: {
      /** Libellé desktop. */
      label: string;
      /** Libellé mobile, plus court. */
      labelShort: string;
      /** Précision pour les lecteurs d'écran : le lien ouvre un autre site. */
      external: string;
    };
    bookCall: string;
  };
  hero: {
    kicker: string;
    /** Deux lignes, sans le point final (posé en bronze par le composant). */
    title: [string, string];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}
