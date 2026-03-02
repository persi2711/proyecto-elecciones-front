# Etapa 1: Construcción
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación para producción
# Esto generará la carpeta /dist/tu-proyecto
RUN npm run build -- --configuration production

# Etapa 2: Ejecución (Runtime)
FROM node:20-alpine

WORKDIR /app

# Copiamos solo lo necesario desde la etapa de build
# NOTA: Ajusta "tu-nombre-de-proyecto" al nombre real en tu carpeta /dist
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

# Instalamos solo dependencias de producción para que sea ligero
RUN npm install --omit=dev

# Exponemos el puerto que usa Railway (usualmente el 8080 o el que definas)
EXPOSE 4000

# Comando para arrancar el servidor de Angular SSR
# El path suele ser dist/tu-proyecto/server/main.server.mjs o similar
CMD ["node", "dist/ProyectoElecciones/main.server.mjs"]
