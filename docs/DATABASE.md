# Base de données

Le schéma couvre les utilisateurs administrateurs, projets, technologies, catégories, compétences, parcours, articles, messages, médias, paramètres et événements anonymisés.

La migration initiale est dans `prisma/migrations/0001_init`. Le seed est idempotent pour les slugs et crée le premier administrateur à partir des variables `ADMIN_EMAIL` et `ADMIN_PASSWORD`.

Pour un fournisseur serverless, utiliser une URL poolée dans `DATABASE_URL` et une URL directe dans `DIRECT_URL`.
