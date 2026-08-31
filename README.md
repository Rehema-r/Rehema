# Rehema — Portfolio de Rehema Kasongo

**Software Engineering Student | Software Developer | Building Real-World Digital Solutions**

[Portfolio public](https://rehema-gules.vercel.app/) · [Profil GitHub](https://github.com/Rehema-r) · [LinkedIn](https://www.linkedin.com/in/rehema-kasongo-4868292a9/)

## Overview

Portfolio d’un étudiant en Bac 3 Informatique, filière Génie Logiciel, à Kolwezi (RDC). Le site présente les projets, le parcours, les domaines de pratique et d’apprentissage, ainsi qu’un CV web imprimable. Il distingue réalisations, prototypes et concepts.

## Problem / Solution

Un catalogue de projets ne permet pas à lui seul d’évaluer leur maturité. Chaque fiche indique donc un objectif, un état, les éléments techniques documentés et les liens disponibles. Les réalisations RM Study, Union Company et RM Tech précèdent les projets techniques en développement.

## Features

- Pages publiques : accueil, projets et fiches détaillées, parcours, compétences, journal, contact, CV.
- Catalogue filtrable et statuts explicites, avec liens publics lorsqu’ils sont disponibles.
- Données éditoriales versionnées dans `features/` ; le catalogue public et `/api/projects` utilisent les données statiques.
- Code d’administration, Auth.js, routes API, schéma Prisma et migrations présents. Leur présence ne constitue pas une validation opérationnelle ou un audit de sécurité.
- Le formulaire de contact et les fonctions persistantes nécessitent une configuration serveur et une base accessibles.

## Technologies

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma 7, PostgreSQL, Auth.js et configuration Docker. Les versions exactes sont verrouillées dans `package-lock.json`. Cette liste décrit le code, pas un niveau d’expertise personnel.

## Architecture

```text
app/         routes publiques, administration et API
components/  interface, layout et animations
features/    composants et données par domaine
lib/         infrastructure, auth, sécurité et constantes
prisma/      schéma, migrations, initialisation explicite
public/      ressources publiques
docs/        architecture et procédures
```

Les groupes de routes n’ajoutent pas de segment public. L’administration est sous `/admin` et les services sous `/api`. Le contenu public est principalement statique : modifier un enregistrement admin ne signifie pas que toutes les pages publiques se mettent à jour.

## Installation

Prérequis : Node.js compatible avec les versions verrouillées (24 conseillé), npm ; PostgreSQL uniquement pour les fonctions persistantes.

```bash
npm ci
npm run db:generate
npm run dev
```

Le site de présentation peut être consulté sans base configurée. Pour les fonctions serveur, copier `.env.example` vers `.env` et remplacer les exemples localement. Prisma charge `.env` ; ne pas compter uniquement sur `.env.local` pour les commandes Prisma.

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL de l’application |
| `DIRECT_URL` | Connexion utilisée par la configuration Prisma si renseignée |
| `AUTH_SECRET` | Secret serveur des sessions |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Initialisation explicite ; jamais des variables publiques |
| `NEXT_PUBLIC_SITE_URL` | URL canonique publique |

Ne committer aucun fichier d’environnement réel. Les valeurs de développement ne conviennent pas à la production.

## Usage et vérifications

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

Consulter `/`, `/projects`, `/about`, `/skills` et `/resume`. L’impression du CV dépend du navigateur.

## Base de données et déploiement

`npm run build` construit uniquement l’application : il n’applique aucune migration et n’initialise aucun compte. Une modification éditoriale ne doit pas remplacer un mot de passe ni écraser des données.

Les commandes `npm run db:migrate` (développement), `npm run db:deploy` (migrations versionnées) et `npm run db:seed` sont des opérations explicites. Vérifier la cible et sauvegarder avant toute exécution. Le seed peut mettre à jour un compte et des contenus : ne jamais le lancer automatiquement sur une base utilisée. Les dates précises du parcours n’étant pas confirmées, le seed ne crée plus de dates déduites de l’ordre d’affichage et laisse les enregistrements existants intacts.

Le déploiement existant utilise Vercel. Le `postinstall` génère Prisma Client ; une publication de la branche suivie peut déclencher un build Vercel. Aucun schéma ni donnée de production n’est modifié par la mise à jour éditoriale du 30 août 2026.

## Project Status / Limitations

Site public en ligne, avec des projets de maturités différentes. RM Study est déclarée fonctionnelle par son auteur ; son URL publique reste à référencer. Le site Union Company est consultable ; son système de gestion n’est pas exposé ici. Codel Academy ne contient pas encore d’implémentation publique.

Aucune affirmation d’utilisateurs, de revenus, d’années d’expérience salariée ou de sécurité de production n’est déduite de ce dépôt. Les fonctions admin, l’envoi de messages et les intégrations externes nécessitent des tests dédiés. Des scripts publicitaires externes existent dans `features/ads` : leur contenu et leur disponibilité sont indépendants du portfolio.

## My Role

Rehema Kasongo porte ce portfolio et la présentation de ses projets. Les outils de développement assisté peuvent contribuer au code et à la documentation ; cette présentation ne revendique pas une réalisation intégralement manuelle. L’historique Git permet d’examiner les contributions.

## Roadmap

1. Référencer la démonstration RM Study et sa documentation technique.
2. Ajouter des preuves propres à chaque projet, sans données internes.
3. Tester les parcours serveur et revoir les dépendances signalées par l’audit npm.
4. Compléter les dates précises et les intitulés de certificats après confirmation. L’Université de Kolwezi et le Bac 3 en 2026 sont confirmés par le CV fourni.

## Screenshots / Demo

La [démonstration publique](https://rehema-gules.vercel.app/) est la référence. Les images de projets ne remplacent pas un test fonctionnel. Aucun système interne ni compte de démonstration sensible n’est publié.
