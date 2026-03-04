# Imagen base Node.js LTS (sin necesidad de tener Node instalado en el host)
FROM node:20-alpine

WORKDIR /app

# Copiar solo dependencias primero para aprovechar caché de Docker
COPY package.json ./

# Instalar dependencias (node_modules vive solo dentro del contenedor)
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Puerto que usa Next.js en desarrollo
EXPOSE 3000

# Desarrollo: next dev con hot reload
# Para producción usar: npm run build && npm run start
CMD ["npm", "run", "dev"]
