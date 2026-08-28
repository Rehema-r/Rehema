# Déploiement

Le projet produit une sortie Next.js `standalone` utilisable dans Docker et reste compatible Vercel.

Avant un déploiement de production :

1. vérifier les variables d’environnement ;
2. lancer `npm run db:deploy` ;
3. lancer `npm run lint`, `npm run typecheck` et `npm run build` ;
4. vérifier `/`, `/projects`, `/contact` et `/admin/login` ;
5. contrôler les logs de fonctions après la mise en ligne.
