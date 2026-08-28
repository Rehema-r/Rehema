# Rehema Digital Universe

Portfolio applicatif de Rehema Kasongo construit avec Next.js 16, React 19, TypeScript, Prisma 7 et PostgreSQL. Le projet sépare les routes, les fonctionnalités et l’infrastructure afin de pouvoir ajouter une administration complète sans fragiliser le site public.

## Prérequis

- Node.js 24 recommandé (20.19+ minimum pour Prisma 7)
- npm 10+
- PostgreSQL 16+ ou Docker Desktop

## Installation

```bash
npm install
copy .env.example .env.local
npm run db:generate
npm run dev
```

Le site public fonctionne avec les données de secours versionnées même sans PostgreSQL. La persistance des messages, les analytics et la connexion admin exigent la base de données.

## Variables d’environnement

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL utilisée par l’application |
| `DIRECT_URL` | Connexion directe utilisée pour les migrations |
| `AUTH_SECRET` | Signature des sessions Auth.js |
| `ADMIN_EMAIL` | Email créé par le seed |
| `ADMIN_PASSWORD` | Mot de passe du seed, 12 caractères minimum |
| `NEXT_PUBLIC_SITE_URL` | URL canonique du portfolio |

Ne jamais committer `.env.local` ni un secret réel.

## PostgreSQL et Prisma

Avec une base locale disponible :

```bash
npm run db:migrate
npm run db:seed
npm run db:studio
```

En production, utiliser `npm run db:deploy` pour appliquer les migrations déjà versionnées.

## Docker

```bash
docker compose up -d postgres
npm run db:migrate
npm run db:seed
docker compose up --build app
```

Le mot de passe PostgreSQL du fichier Compose est uniquement destiné au développement local.

## Vérifications

```bash
npm run lint
npm run typecheck
npm run build
```

## Architecture

```text
app/          routes publiques, admin et API
components/   primitives de layout, mouvement et interface
features/     logique et composants regroupés par domaine
lib/          base de données, authentification, sécurité, constantes
prisma/       schéma, migration initiale et seed
public/       images et futurs documents publics
docs/         décisions d’architecture et procédures
```

Le groupe `app/(public)` n’ajoute aucun segment à l’URL. L’administration vit sous `/admin`, les services sous `/api`, et `proxy.ts` protège les routes de gestion conformément à Next.js 16.

## Monétisation Adsterra

Le domaine `rehema-gules.vercel.app` est enregistré dans Adsterra sous l’identifiant `6014590`. Les composants de `features/ads` chargent les scripts après l’hydratation afin de préserver le rendu initial :

- Native Banner dans le journal ;
- bannière `728×90` sur ordinateur ;
- bannière `320×50` sur mobile.

Les formats intrusifs Popunder et Social Bar ainsi que les publicités adultes sont désactivés.

## Déploiement Vercel

1. Créer ou connecter une base PostgreSQL.
2. Ajouter les variables d’environnement au projet Vercel.
3. Exécuter la migration de production depuis un environnement autorisé.
4. Exécuter le seed une seule fois avec un mot de passe fort.
5. Déployer la branche `main`.

Le script `postinstall` génère automatiquement Prisma Client pendant le build.
