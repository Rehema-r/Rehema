# API

- `POST /api/contact` : validation Zod, honeypot, rate limit et stockage d’un message.
- `GET /api/projects` : catalogue public de secours.
- `POST /api/analytics/event` : événements limités et respectueux de la vie privée.
- `/api/auth/[...nextauth]` : handlers Auth.js.

Les erreurs sont retournées en JSON avec des codes HTTP explicites. Sans PostgreSQL, le contact répond `503` et l’interface propose l’email direct.
