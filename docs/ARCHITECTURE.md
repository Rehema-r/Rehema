# Architecture

```text
PUBLIC ─┐
ADMIN  ─┼─> FEATURES ─> PRISMA ─> POSTGRESQL
API    ─┘
```

- `app/(public)` compose l’expérience visiteur.
- `app/admin` contient la console sécurisée et ses vues.
- `app/api` expose uniquement les services nécessaires au navigateur.
- `features` possède les contrats, données de secours et composants de chaque domaine.
- `lib` contient les services transverses sans dépendre de l’interface.
- `prisma` décrit la source persistante et ses migrations.

Les Server Components sont la règle. Les Client Components sont limités aux filtres, formulaires, animations, navigation mobile et quiz.
