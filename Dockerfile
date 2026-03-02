# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copiamos todo (incluyendo la carpeta src)
COPY . .

# Ejecutamos el build de producción
RUN npm run build -- --configuration production

# Etapa 2: Ejecución (SSR)
FROM node:20-alpine
WORKDIR /app

# Copiamos lo que generó el build
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 4000

# IMPORTANTE: Verifica que el nombre de la carpeta en dist sea "proyecto-elecciones"
CMD ["node", "dist/proyecto-elecciones/server/main.server.mjs"]
