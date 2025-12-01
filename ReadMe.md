# API REST TS Socket - Infraestrutura & CI/CD

Este projeto consiste em uma API desenvolvida em **Node.js (TypeScript)**, utilizando **Docker** para containerização e **AWS EC2** para hospedagem.

O diferencial desta infraestrutura é a estratégia de **Otimização de Custos**, onde rodamos dois ambientes isolados (Produção e Homologação) dentro de uma única instância EC2, utilizando Docker Compose para orquestração de portas e serviços.

## 🚀 Arquitetura de Deploy

O deploy é totalmente automatizado via **GitHub Actions**, conectando-se à AWS de forma segura sem chaves permanentes (long-lived credentials).

### Fluxo do Pipeline (CI/CD)

1.  **Trigger:**
    * Push na branch `dev` -> Dispara deploy para ambiente de **Homologação**.
    * Merge/Push na branch `master` -> Dispara deploy para ambiente de **Produção**.
2.  **Segurança (OIDC):**
    * O GitHub Actions se autentica na AWS assumindo uma **IAM Role** específica via **OpenID Connect (OIDC)**. Isso elimina a necessidade de salvar `AWS_ACCESS_KEY` nos secrets.
3.  **Acesso ao Servidor:**
    * O workflow acessa a instância EC2 via SSH utilizando uma chave privada armazenada nos GitHub Secrets.
4.  **Build & Deploy:**
    * O código é atualizado (`git pull`).
    * Um arquivo `.env` é gerado dinamicamente com base nos segredos do ambiente (Dev ou Prod).
    * O Docker Compose constrói a imagem e recria apenas o container do ambiente específico.

---

## 🛠️ Gerenciamento de Variáveis de Ambiente

Por segurança, **nenhuma senha ou credencial é versionada** no código.

1.  **No GitHub:** As credenciais reais (DB Password, Host, etc.) estão salvas em **Settings > Environments** (`dev` e `prod`).
2.  **No Docker Compose:** O arquivo `docker-compose.yml` utiliza placeholders (`${VARIAVEL}`).
3.  **Na Execução:** Durante o deploy, o GitHub Actions injeta os valores dos secrets em um arquivo `.env` dentro do servidor, que é lido pelo Docker Compose ao subir os containers.

### Variáveis Necessárias (GitHub Secrets)

| Variável | Descrição |
| :--- | :--- |
| `AWS_ROLE_ARN` | ARN da Role IAM para OIDC |
| `AWS_REGION` | Região da AWS (ex: us-east-1) |
| `EC2_HOST` | IP Elástico da instância EC2 |
| `EC2_SSH_KEY` | Chave privada `.pem` para acesso SSH |
| `DB_HOST` | Host do Banco de Dados (Neon/RDS) |
| `DB_USERNAME` | Usuário do Banco |
| `DB_PASSWORD` | Senha do Banco |
| `DB_NAME` | Nome do Banco (Diferente para Prod e Dev) |

---

## 🐳 Docker & Portas

Utilizamos uma estratégia de mapeamento de portas para manter os ambientes na mesma máquina:

| Ambiente | Branch | Container | Porta Externa (EC2) | Porta Interna (Container) |
| :--- | :--- | :--- | :--- | :--- |
| **Produção** | `master` | `api-prod` | **3000** | 3000 |
| **Homologação** | `dev` | `api-dev` | **3001** | 3000 |

* **Dockerfile:** Otimizado para TypeScript. Realiza o `npm ci`, compila o código (`npm run build`) para a pasta `dist` e executa as migrações do banco antes de iniciar.

---

## 💻 Como Rodar Localmente

### Pré-requisitos
* Node.js 20+
* Docker & Docker Compose

### Passos

1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Configurar Variáveis:**
    Crie um arquivo `.env` na raiz com base no `.env.example`.

3.  **Rodar em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Rodar via Docker (Simulando Prod):**
    ```bash
    docker compose up --build api-prod
    ```

---

## 📦 Scripts de Build

O projeto utiliza TypeScript, portanto o código deve ser transpilado antes da execução em produção.

* `npm run build`: Compila os arquivos `.ts` da pasta `src` para a pasta `dist`.
* `npm start`: Inicia a aplicação rodando o arquivo compilado `dist/server.js`.
* `npm run dev`: Inicia a aplicação com `nodemon` e `ts-node` (apenas desenvolvimento).

---

## 📝 Comandos Úteis (No Servidor)

Para manutenção na EC2:

```bash
# Ver containers rodando
docker ps

# Ver logs de produção (tempo real)
docker logs -f api-prod

# Ver logs de homologação
docker logs -f api-dev

# Reiniciar um serviço manualmente
docker compose restart api-prod