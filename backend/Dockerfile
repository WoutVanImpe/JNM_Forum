# Gebruik een lichte en stabiele Node LTS versie
FROM node:20-alpine

# Stel de werkmap binnen de container in
WORKDIR /app

# Kopieer package files eerst voor efficiënte caching van dependencies
COPY package*.json ./

# Installeer dependencies (inclusief tsx en typescript voor development)
RUN npm install

# Kopieer de rest van de backend bestanden (routes, controllers, knexfile, etc.)
COPY . .

# Stel de poort open (komt overeen met API_PORT in je .env, meestal 3000)
EXPOSE 3000

# Start de dev server met live-reloading (via tsx watch)
CMD ["npm", "run", "dev"]