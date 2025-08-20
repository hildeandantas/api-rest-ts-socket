# API REST Template com TypeScript, JWT e WebSocket

Este projeto é um template de API RESTful desenvolvida em **TypeScript** utilizando **Express**, com autenticação JWT e integração de WebSocket via **Socket.IO**. Ele oferece uma base robusta para aplicações modernas, incluindo rotas para criação, edição, deleção e busca de usuários, além de autenticação segura.

## Funcionalidades

- **API RESTful** com rotas para:
  - Criação de usuários
  - Edição de usuários
  - Deleção de usuários
  - Busca de usuários (por ID e listagem)
- **Autenticação JWT** para proteger rotas e garantir segurança
- **WebSocket** com Socket.IO para comunicação em tempo real
- **TypeScript** para tipagem estática e maior confiabilidade
- **Sequelize** para integração com banco de dados relacional (PostgreSQL)
- Estrutura de projeto organizada para fácil manutenção e escalabilidade

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/api-rest-ts-socket.git
   cd api-rest-ts-socket

2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```sh
   Renomeie .env.example para .env e preencha com suas configurações de banco de dados e JWT.
   ```
4. Execute as migrações e seeds:
   ```sh
   npm run init
   ```
5. Inicie o servidor:
   ```sh
   npm run start (ou npm run dev para desenvolvimento)
   ```

Rotas Principais
    POST /users/create — Criação de usuário
    GET /users/:id — Busca de usuário por ID (JWT obrigatório)
    GET /users/ — Listagem de usuários (JWT obrigatório)
    PUT /users/:id — Edição de usuário (JWT obrigatório)
    DELETE /users/:id — Deleção de usuário (JWT obrigatório)
    POST /auth/login — Login e geração de token JWT

WebSocket
    O WebSocket é inicializado junto ao servidor HTTP e utiliza autenticação JWT para conexão. Os eventos principais estão definidos em src/lib/socket.ts.

Estrutura do Projeto
    src/controllers — Lógica dos endpoints
    src/services — Regras de negócio
    src/models — Modelos Sequelize
    src/routes — Definição das rotas
    src/middlewares — Middlewares (ex: autenticação)
    src/utils — Utilitários (ex: hash de senha)
    src/lib — Integração com WebSocket
Tecnologias
    Node.js
    TypeScript
    Express
    Sequelize (PostgreSQL)
    Socket.IO
    JWT (jsonwebtoken)
    Bcrypt
Licença
    Este projeto está sob a licença ISC.