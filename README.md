# NexaFood API

Une API RESTful moderne construite avec NestJS pour la gestion de tâches avec authentification utilisateur.

## 🚀 Caractéristiques

- **Architecture modulaire** basée sur NestJS
- **Authentification** avec Better Auth (sessions sécurisées)
- **Base de données** PostgreSQL avec Prisma ORM
- **Validation** des données avec Zod
- **Documentation API** avec Swagger/OpenAPI
- **Sécurité** avec Helmet, Throttling et Guards
- **Logging** structuré avec Pino
- **Health checks** avec Terminus
- **Tests** avec Vitest

## 🛠️ Stack Technique

- **Framework**: NestJS 11.2.5
- **Runtime**: Node.js >=22.12 avec Bun
- **Langage**: TypeScript 5.9.3
- **Base de données**: PostgreSQL avec Prisma 7
- **Authentification**: Better Auth 1.6.26
- **Validation**: Zod 4.4.3
- **Logging**: Pino 10.3.1
- **Testing**: Vitest 4.1.10
- **Code Quality**: Biome 2.5.7, Lefthook 2.1.10

## 📋 Prérequis

- Node.js >=22.12
- Bun 1.2.14
- PostgreSQL (local ou cloud)

## 🔧 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd Projet_task_API
```

2. **Installer les dépendances**
```bash
bun install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditez le fichier `.env` avec vos configurations:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/nexafood
BETTER_AUTH_SECRET=votre_secret_minimum_16_caracteres
BETTER_AUTH_URL=http://localhost:3000
```

4. **Initialiser la base de données**
```bash
# Générer le client Prisma
bun run db:generate

# Pousser le schéma vers la base de données
bun run db:push
```

## 🚀 Démarrage

### Mode développement
```bash
bun run dev
```

### Mode production
```bash
# Build
bun run build

# Démarrer
bun run start
```

### Mode debug
```bash
bun run dev:debug
```

## 📚 Documentation API

L'API documentation est disponible via Swagger UI:
- **URL**: http://localhost:3000/docs
- **Format**: OpenAPI 3.0

### Endpoints Principaux

#### Authentification (`/api/auth/*`)
- `POST /api/auth/sign-up` - Inscription
- `POST /api/auth/sign-in` - Connexion
- `POST /api/auth/sign-out` - Déconnexion

#### Tâches (`/tasks/*`)
- `GET /tasks` - Lister les tâches de l'utilisateur (authentifié)
- `GET /tasks/:id` - Récupérer une tâche spécifique
- `POST /tasks` - Créer une nouvelle tâche
- `PATCH /tasks/:id` - Mettre à jour une tâche
- `PATCH /tasks/:id/completed` - Marquer comme terminée
- `DELETE /tasks/:id` - Supprimer une tâche

#### Exemples (`/examples/*`)
- `GET /examples` - Lister les exemples
- `GET /examples/:id` - Récupérer un exemple
- `POST /examples` - Créer un exemple
- `PATCH /examples/:id` - Mettre à jour un exemple
- `DELETE /examples/:id` - Supprimer un exemple

## 🧪 Tests

### Tests unitaires
```bash
bun run test
```

### Tests en mode watch
```bash
bun run test:watch
```

### Tests avec couverture
```bash
bun run test:cov
```

### Tests E2E
```bash
bun run test:e2e
```

## 🗄️ Base de Données

### Commandes Prisma
```bash
# Générer le client
bun run db:generate

# Pousser le schéma (development)
bun run db:push

# Créer une migration
bun run db:migrate

# Déployer les migrations (production)
bun run db:deploy

# Ouvrir Prisma Studio
bun run db:studio
```

### Schéma Actuel
- **User**: Utilisateurs avec authentification
- **Task**: Tâches avec priorités (LOW, MEDIUM, HIGH)
- **Session**: Sessions utilisateur
- **Account**: Comptes liés (OAuth)
- **Verification**: Jetons de vérification

## 🔒 Sécurité

- **Helmet**: Protection des headers HTTP
- **Throttling**: Limite de 20 requêtes par minute par IP
- **Session Guards**: Protection des routes sensibles
- **Zod Validation**: Validation stricte des entrées
- **CORS**: Configuration recommandée pour production

## 📊 Observabilité

### Logging
- Logs structurés avec Pino
- Format lisible en développement (pino-pretty)
- Logs JSON en production

### Health Checks
Endpoint disponible via Terminus (à configurer selon vos besoins)

## 🏗️ Structure du Projet

```
src/
├── auth/              # Module d'authentification
├── common/            # Utilitaires partagés
│   ├── dto/          # Data Transfer Objects
│   ├── filters/      # Filtres d'exceptions
│   ├── guards/       # Guards de sécurité
│   └── interceptors/ # Interceptors
├── config/           # Configuration
├── modules/          # Modules fonctionnels
│   ├── example/     # Module exemple
│   └── tasks/       # Module de tâches
├── prisma/           # Service Prisma
├── app.controller.ts # Contrôleur racine
├── app.module.ts     # Module racine
├── app.service.ts    # Service racine
└── main.ts           # Point d'entrée
```

## 🔧 Configuration de Développement

### Linting
```bash
# Vérifier le code
bun run check

# Corriger automatiquement
bun run check:fix
```

### Type Checking
```bash
bun run check-types
```

## 🚢 Déploiement

### Build
```bash
bun run build
```

### Variables d'environnement en production
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=<strong-secret>
BETTER_AUTH_URL=https://your-domain.com
```

### Recommandations
- Utiliser HTTPS en production
- Configurer les variables CORS appropriées
- Utiliser un pool de connexions Prisma optimisé
- Configurer un reverse proxy (Nginx, etc.)
- Mettre en place des logs centralisés

## 🐛 Dépannage

### Port déjà utilisé
```bash
# Sur Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est en cours d'exécution
- Vérifiez la chaîne de connexion DATABASE_URL
- Assurez-vous que la base de données existe

### Erreur d'authentification
- Vérifiez que BETTER_AUTH_SECRET a au moins 16 caractères
- Vérifiez que BETTER_AUTH_URL correspond à votre domaine

## 📝 License

UNLICENSED

## 🤝 Contribution

Les contributions sont les bienvenues! Veuillez suivre les lignes directrices du projet.

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le repository.
