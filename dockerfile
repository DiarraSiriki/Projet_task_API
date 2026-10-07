# Étape 1 : Build
FROM node:22

WORKDIR /app

# Installer Bun
RUN npm install -g bun

# Copier les fichiers de dépendances
COPY package.json bun.lock ./

# Installer les dépendances avec Bun
RUN bun install --ignore-scripts

# Copier le reste du code source
COPY . .

RUN bun run db:generate

# Construire l'application
RUN bun run build


EXPOSE 3000

# Démarrer l'application avec Node
CMD ["bun", "run", "start"]