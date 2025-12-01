FROM node:20-alpine

WORKDIR /app

# 1. Copia os arquivos de dependência
COPY package*.json ./
COPY tsconfig*.json ./

# 2. Instala TODAS as dependências (incluindo devDependencies para rodar o tsc e sequelize-cli)
RUN npm ci

# 3. Copia o código fonte
COPY . .

# 4. Compila o TypeScript para JavaScript (cria a pasta dist)
RUN npm run build

# 5. Expõe a porta interna
EXPOSE 3000

# 6. Script de inicialização (Roda migração antes de subir o servidor)
# Usamos 'sh -c' para poder rodar múltiplos comandos
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:migrate && npm run start:prod"]