# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia e instala dependências
COPY package*.json ./
RUN npm ci

# Copia o resto do código e faz o build
COPY . .
RUN npm run build   

# Expõe a porta que a aplicação usa INTERNAMENTE (o NestJS geralmente usa 3000)
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "run", "start:prod"]