# API REST Template com TypeScript, JWT, WebSocket e Docker

Este projeto é um template de **API RESTful** desenvolvido em **TypeScript** utilizando **Express**, com autenticação **JWT** e integração de **WebSocket** via **Socket.IO**.

Além das funcionalidades de aplicação, este projeto conta com uma infraestrutura completa de **CI/CD** configurada com **GitHub Actions**, **Docker** e **AWS EC2**, permitindo deploy automatizado em múltiplos ambientes (Produção e Homologação) com otimização de custos.

---

## 🚀 Funcionalidades

### Aplicação
- **API RESTful** com rotas para CRUD de usuários.
- **Autenticação JWT** para proteção de rotas.
- **WebSocket** com Socket.IO para tempo real.
- **TypeScript** para tipagem estática.
- **Sequelize** (PostgreSQL) para banco de dados.

### Infraestrutura & DevOps
- **Dockerização:** Aplicação rodando em containers isolados.
- **CI/CD Automatizado:** Pipeline via GitHub Actions com autenticação segura (OIDC).
- **Multi-Ambiente:** Produção e Homologação rodando na mesma instância EC2 (Cost Optimization).
- **Zero Downtime (quase):** Reinício automático de containers via Docker Compose.

---

## 📦 Instalação e Execução

### Opção 1: Desenvolvimento Local (Sem Docker)

1. Clone o repositório:
   git clone https://github.com/seu-usuario/api-rest-ts-socket.git
   cd api-rest-ts-socket

2. Instale as dependências:
   npm install

3. Configure as variáveis de ambiente:
   Renomeie o arquivo `.env.example` para `.env` e preencha com suas configurações locais.

4. Execute as migrações e seeds:
   npm run init

5. Inicie o servidor em modo watch:
   npm run dev

### Opção 2: Rodando com Docker (Simulando Produção)

Para testar a versão final que irá para a AWS:

1. Gere o build e suba o container:
   docker compose up --build api-prod

2. A aplicação estará disponível em http://localhost:3000

---

## ☁️ Infraestrutura e Deploy (AWS)

O projeto está configurado para rodar em uma instância **AWS EC2** utilizando **Docker Compose** para orquestrar os ambientes.

### Fluxo de CI/CD (GitHub Actions)

O pipeline de deploy é disparado automaticamente baseado na branch:

| Evento | Branch | Ambiente de Destino | Porta na EC2 |
| :--- | :--- | :--- | :--- |
| **Push** | `dev` | **Homologação** (api-dev) | Porta **3001** |
| **Push/Merge** | `master` | **Produção** (api-prod) | Porta **3000** |

### Segurança e Variáveis

Nenhuma credencial é salva no código. O gerenciamento é feito via **GitHub Secrets**:

1. O GitHub Actions se conecta à AWS via **OIDC** (sem chaves de acesso fixas).
2. As senhas (`DB_PASSWORD`, `JWT_SECRET`, etc.) são injetadas em um arquivo `.env` seguro dentro do servidor apenas durante o deploy.
3. O Docker Compose lê essas variáveis para subir os containers.

---

## 📌 Rotas Principais

- **Usuários**
  - POST /users/create — Criação de usuário (Campos Necessários: firstName, LastName, Email and Password)
  - GET /users/:id — Busca de usuário por ID (JWT obrigatório)
  - GET /users/ — Listagem de usuários (JWT obrigatório)
  - PUT /users/:id — Edição de usuário (JWT obrigatório)
  - DELETE /users/:id — Deleção de usuário (JWT obrigatório)

- **Autenticação**
  - POST /auth/login — Login e geração de token JWT

---

## 🔗 WebSocket

O **WebSocket** é inicializado junto ao servidor HTTP e utiliza **JWT** para autenticação de conexão.  
Os eventos principais estão definidos em:

src/lib/socket.ts

---

## 📂 Estrutura do Projeto

src/
 ├── controllers   # Lógica dos endpoints
 ├── services      # Regras de negócio
 ├── models        # Modelos Sequelize
 ├── routes        # Definição das rotas
 ├── middlewares   # Middlewares (ex: autenticação)
 ├── utils         # Utilitários (ex: hash, erros)
 └── lib           # Integração com WebSocket
.github/
 └── workflows     # Pipelines de CI/CD
docker-compose.yml # Orquestração dos containers
Dockerfile         # Receita de build da imagem

---

## 🛠 Tecnologias

- **Backend:** Node.js, TypeScript, Express
- **Banco de Dados:** PostgreSQL, Sequelize
- **Realtime:** Socket.IO
- **Segurança:** JWT, Bcrypt
- **Infraestrutura:** Docker, Docker Compose, AWS EC2
- **CI/CD:** GitHub Actions

---

## 📜 Licença

Este projeto está sob a licença **ISC**.