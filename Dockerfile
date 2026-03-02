# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generamos el build de producción
RUN npm run build -- --configuration production

# Etapa 2: Ejecución (SSR)
FROM node:20-alpine
WORKDIR /app

# Copiamos la carpeta dist completa
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --omit=dev

# Exponemos el puerto para Railway
EXPOSE 4000

# RUTA EXACTA (Asegúrate de que ProyectoElecciones tenga las mayúsculas correctas)
CMD ["npm", "run", "serve:ssr"]
