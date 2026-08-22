# Éos (EOS) — Assistance visuelle temps réel pour la DMLA

## En une phrase

Éos est un POC d'assistance visuelle temps réel pour les personnes atteintes de **DMLA** (Dégénérescence Maculaire Liée à l'Âge) : un casque équipé d'un iPhone 17 Pro traduit la scène perçue en une **carte sémantique ultra-contrastée**, conçue pour rester lisible par la vision périphérique — la seule partie de la rétine encore fonctionnelle chez ces patients.

## Le problème

La DMLA ne détruit pas toute la vision : elle détruit la **fovéa**, le centre de la rétine responsable de la vision fine et des couleurs. La périphérie rétinienne reste sensible à la luminance, au mouvement, aux basses fréquences spatiales et à certaines couleurs (le jaune en particulier).

Les solutions existantes sur le marché (eSight Go, IrisVision Inspire, OrCam MyEye, NuEyes Pro 3, OxSight Crystal…) cherchent à *restaurer* une vision quasi normale via zoom ou renforcement des contours. Le problème : ces approches surchargent une périphérie déjà fragile et n'exploitent pas ce que le patient voit réellement encore.

## L'idée : traduire plutôt que restaurer

Éos abandonne la fovéa et **traduit la scène dans le dialecte visuel que la rétine périphérique sait encore lire** : aplats de couleur grossiers, damiers en basses fréquences spatiales, jaune comme couleur signal (double activation des cônes L et M), aucune information portée par le bleu (filtré par le cristallin, source de phototoxicité).

### Les 4 différenciateurs du projet

1. **Anti-foveated rendering** — l'image est nette partout *sauf* dans la zone du scotome central (l'inverse exact du paradigme utilisé par l'Apple Vision Pro). Une approche inédite sur le marché de la basse vision.
2. **Trajectoire libre (Navigable Space)** — le système indique *où marcher* en jaune (signal positif) plutôt que *où ne pas marcher* en rouge (signal anxiogène), une logique inspirée du balisage lumineux aéroportuaire.
3. **Architecture Fast/Slow Brain** — inspirée des architectures de conduite autonome : un cerveau "rapide" embarqué pour la réactivité immédiate, un cerveau "lent" pour la sémantique plus riche. Inédit dans le secteur de la basse vision (pour le prototype final de soutenance, le traitement a été recentré quasi intégralement on-device sur l'iPhone).
4. **Simulateur de DMLA intégré** — un curseur permet de faire passer la scène affichée d'une vision parfaite à une DMLA sévère simulée en temps réel. C'est l'outil de démo et d'onboarding : le moment où l'on comprend viscéralement le problème avant même de voir la solution technique.

## Stack technique

Le prototype final tourne quasi intégralement **on-device sur iPhone 17 Pro**, monté dans un casque, avec :

- **ARKit** (`ARWorldTrackingConfiguration`) + **LiDAR** (`ARMeshAnchor`) pour le tracking 6DoF et la classification géométrique sol/mur — le LiDAR fait office de vérité de référence pour tout ce qui est *safety-critical*
- **CoreML** pour la segmentation sémantique on-device (personnes, chaises, tables, véhicules, escaliers…), avec un objectif de latence < 30 ms
- **Metal / MetalKit** pour le rendu custom (aplats de couleur, damiers, masque anti-foveated)
- **RealityKit** pour la composition de la scène 3D et la reprojection
- **CoreMotion** pour la reprojection prédictive anti-cybersickness
- **SwiftUI** pour l'interface (simulateur DMLA, réglages de luminance, choix de palette)
- **AVFoundation** pour le signal audio "danger"

Principe de sécurité central : le LiDAR ne peut jamais être contredit par l'IA sur les éléments critiques, et aucune donnée ne quitte l'iPhone (traitement 100% local, *privacy by design*).

En amont du recentrage on-device, une architecture distribuée iPhone ↔ Mac a été développée et testée (streaming vidéo temps réel via **LiveKit/WebRTC**, cartographie 3D synchronisée en temps réel entre les deux appareils) — cette brique reste disponible mais n'est plus centrale au prototype final.

## Mon rôle

Développement technique intégral du projet côté ingénierie : Swift/iOS, ARKit, CoreML, Metal, ainsi que la mise en place de l'architecture de streaming temps réel (LiveKit/WebRTC) entre iPhone et Mac pendant la phase d'exploration bi-plateforme.

## Contexte du projet

Projet mené en équipe de 5 dans le cadre de la 2ᵉ année de **DNMADE Numérique** (Diplôme National des Métiers d'Art et du Design), parcours Grammaire Visuelle, à l'école **By CCI**. Rendu final et soutenance en juin 2026.

- **Killian** — développement technique intégral (Swift/iOS, CoreML, ARKit, Metal)
- **Axel** — design UX/DA, direction artistique, landing page
- **Céline** — direction artistique, contenus médicaux, moodboard
- **Cécile** — storytelling, trailer, communication
- **Nasima** — recherche, structuration de la landing page

## Historique du nom

Le projet s'est d'abord appelé **Albor** (nom technique) avec la marque **Blur**. Ces noms ont été abandonnés au profit du nom définitif **Éos**.
