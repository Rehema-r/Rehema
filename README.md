# Rehema — Portfolio de Rehema Kasongo

**Software Engineering Student | Software Developer | Building Real-World Digital Solutions**

[Portfolio public](https://rehema-gules.vercel.app/) · [Profil GitHub](https://github.com/Rehema-r) · [LinkedIn](https://www.linkedin.com/in/rehema-kasongo-4868292a9/)

## Présentation

Portfolio d’un étudiant en Bac 3 Informatique, filière Génie Logiciel, à Kolwezi (RDC). Il présente les réalisations, les projets en développement, les concepts, le parcours, les domaines de pratique et un CV web imprimable. Les pages publiques et l’administration utilisent les mêmes contenus PostgreSQL lorsqu’une base est configurée.

Les réalisations confirmées RM Study, Union Company et RM Tech sont distinguées des expérimentations et concepts. Aucune métrique, certification, relation d’emploi ou maturité technique non confirmée n’est inventée.

## Fonctionnalités

- Pages publiques : accueil, services, projets et fiches, parcours, compétences, journal, contact et CV.
- Catalogue filtrable de 14 réalisations et projets connus, avec statuts, preuves et liens disponibles.
- Administration sécurisée : projets, articles, compétences, catégories, parcours, messages, coordonnées, annonces et statistiques.
- Brouillons, publication programmée, archivage et masquage sans suppression destructive.
- Messages persistés et classables ; réponse via la messagerie de l’administrateur.
- Statistiques agrégées sans cookie d’analyse, adresse IP ou identifiant de visiteur conservé dans les événements.
- Bannière Adsterra responsive sur les pages publiques, désactivable dans les paramètres.
- Agent Portfolio interne sans IA : synchronisation quotidienne des nouveaux dépôts GitHub, création de fiches et d’actualités, avec publication LinkedIn optionnelle par API officielle.

## Technologies

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma 7, PostgreSQL, Auth.js et Docker. Les versions exactes sont verrouillées dans `package-lock.json`. Cette liste décrit le code, pas un niveau d’expertise personnel.

## Architecture

```text
app/         routes publiques, administration et API
components/  interface, layout et animations
features/    logique et composants par domaine
lib/         base, authentification, sécurité et constantes
prisma/      schéma, migrations et initialisation explicite
public/      images et ressources publiques
tests/       validations unitaires et intégration locale protégée
```

Les groupes de routes n’ajoutent pas de segment public. L’administration est sous `/admin`, les services sous `/api`. Sans `DATABASE_URL`, le site public utilise les données de démonstration versionnées. Avec PostgreSQL, la base est la source de vérité : masquer un contenu ou laisser une liste vide ne fait pas réapparaître les données de secours.

## Installation

Prérequis : Node.js 24 conseillé, npm et PostgreSQL pour les fonctions persistantes.

```bash
npm ci
npm run db:generate
npm run dev
```

## Variables d’environnement

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL de l’application |
| `DIRECT_URL` | Connexion directe utilisée par Prisma si renseignée |
| `DATABASE_URL_UNPOOLED` | Connexion directe Neon si `DIRECT_URL` est absente |
| `AUTH_SECRET` | Signature serveur des sessions |
| `ADMIN_EMAIL` | Email utilisé lors de l’initialisation manuelle |
| `ADMIN_PASSWORD` | Mot de passe temporaire du seed, 12 caractères minimum |
| `NEXT_PUBLIC_SITE_URL` | URL canonique publique |
| `CRON_SECRET` | Protège l’appel quotidien de l’Agent Portfolio par Vercel |
| `GITHUB_TOKEN` | Optionnel, augmente la limite de l’API GitHub |
| `LINKEDIN_ACCESS_TOKEN` | Optionnel, jeton officiel autorisant la publication LinkedIn |
| `LINKEDIN_AUTHOR_URN` | Optionnel, identifiant officiel du membre LinkedIn |
| `LINKEDIN_API_VERSION` | Version mensuelle de l’API LinkedIn |

Ne committer aucun fichier d’environnement réel. `ADMIN_PASSWORD` sert uniquement à l’initialisation manuelle et doit être retiré après celle-ci. Ne pas relancer le seed sur une base éditée : il peut mettre à jour le compte et les contenus initiaux.

## Base de données

Les migrations et le seed sont des opérations de maintenance explicites. Vérifier la cible et sauvegarder avant exécution.

```bash
npm run db:migrate
npm run db:deploy
npm run db:seed
npm run db:studio
```

La CLI Prisma ne charge pas automatiquement `.env.local`. En développement local, utiliser au besoin `node --env-file=.env.local` devant l’exécutable concerné.

## Administration

- `/admin/projects` : créer, modifier, mettre en avant ou masquer un projet.
- `/admin/blog` : brouillon, publication immédiate ou programmée, archivage.
- `/admin/skills` : compétences, niveaux, visibilité, ordre et catégories.
- `/admin/journey` : étapes, dates, domaines et visibilité.
- `/admin/messages` : texte complet, filtres et statut de traitement.
- `/admin/settings` : coordonnées publiques et interrupteurs annonces/statistiques.
- `/admin/analytics` : consultations agrégées des 30 derniers jours.
- `/admin/agent` : état, historique synthétique et lancement manuel de l’agent hébergé.

Toutes les écritures revérifient la session et le rôle ADMIN en base, valident les champs côté serveur et actualisent les pages publiques. Le téléversement de nouveaux fichiers et l’envoi automatique d’e-mails ne sont pas configurés ; le sélecteur propose les images déjà présentes dans `public/images`.

## Vérifications

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

Les tests d’intégration refusent toute base autre que la base locale isolée sur le port **51214**. Ils créent des enregistrements synthétiques puis suppriment uniquement leurs propres enregistrements.

## Déploiement et limites

`npm run build` construit uniquement l’application : il n’applique aucune migration et ne lance aucun seed. Une publication éditoriale ne remplace donc pas un mot de passe et n’écrase pas les contenus. Le `postinstall` génère Prisma Client. Le mode `standalone` est réservé à Docker et désactivé dans Vercel.

La diffusion publicitaire dépend de l’inventaire Adsterra, des règles du réseau et des bloqueurs ; aucun gain n’est garanti. Les formats intrusifs Popunder et Social Bar ainsi que les publicités adultes sont désactivés.

L’Agent Portfolio est une fonction déterministe exécutée quotidiennement par Vercel Cron vers 9 h, heure de Lubumbashi. Il n’appelle ni Codex ni un modèle d’IA. Sur le plan Hobby, Vercel peut décaler l’exécution dans l’heure prévue. La synchronisation GitHub fonctionne sans jeton à faible fréquence ; LinkedIn reste inactif tant que l’application LinkedIn, le droit `w_member_social`, le jeton et l’URN du membre ne sont pas configurés.

RM Study est déclarée fonctionnelle par son auteur ; son URL publique reste à référencer. Le site Union Company est consultable ; son système de gestion n’est pas exposé. Codel Academy ne contient pas encore d’implémentation publique. Les autres éléments gardent un statut explicite tant que leur démonstration ou documentation n’est pas fournie.

## Rôle et feuille de route

Rehema Kasongo porte le portfolio et la présentation des projets. Des outils de développement assisté peuvent contribuer au code et à la documentation ; l’historique Git permet d’examiner les contributions.

1. Référencer la démonstration RM Study et sa documentation technique.
2. Ajouter des preuves propres à chaque projet sans publier de données internes.
3. Compléter les dates et intitulés de certificats après confirmation.
4. Configurer, si nécessaire, un service d’envoi d’e-mails et un stockage d’images.

La [démonstration publique](https://rehema-gules.vercel.app/) est la référence.
