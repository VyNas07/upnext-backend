# UpNext Backend API

Backend da plataforma UpNext - API REST para gerenciamento de programas de formação em tecnologia.

## Tecnologias

- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- Swagger

## Pré-requisitos

- Node.js >= 18.x
- npm ou yarn

## Instalação

```bash
git clone <url-do-repositorio>
cd upnext-backend
npm install
```

## Configuração

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## Banco de Dados

```bash
# Executar migrações
npm run prisma:migrate

# Popular com dados de exemplo
npm run prisma:seed

# Abrir interface visual
npm run prisma:studio
```

## Execução

**Desenvolvimento:**

```bash
npm run dev
```

**Produção:**

```bash
npm run build
npm start
```

## Documentação

Após iniciar o servidor:

- API Docs: <http://localhost:3001/api-docs>
- Health Check: <http://localhost:3001/health>
- API Info: <http://localhost:3001/api>

## Estrutura

```
src/
├── config/           # Configurações (Swagger)
├── controllers/      # Controllers HTTP
├── services/         # Lógica de negócio
├── repositories/     # Acesso ao banco
├── routes/           # Definição de rotas
└── server.ts         # Servidor Express

prisma/
├── schema.prisma     # Schema do banco
└── seed.ts           # Dados iniciais
```

## Arquitetura

O backend segue a arquitetura em camadas (Layered Architecture):

### Repository Layer (Acesso a Dados)

- **Responsabilidade:** Comunicação direta com o banco de dados via Prisma
- **Localização:** `src/repositories/`
- **Exemplo:** `ProgramRepository`, `InstitutionRepository`
- **Métodos típicos:** `findAll()`, `findById()`, `create()`, `update()`, `delete()`
- **Regra:** Não contém lógica de negócio, apenas queries

### Service Layer (Lógica de Negócio)

- **Responsabilidade:** Regras de negócio, validações, transformações de dados
- **Localização:** `src/services/`
- **Exemplo:** `ProgramService`, `InstitutionService`
- **Regra:** Não acessa o banco diretamente, usa Repositories
- **Exemplo de lógica:** Parsing de arrays JSON, validação de datas, formatação de dados

### Controller Layer (HTTP Handlers)

- **Responsabilidade:** Receber requisições HTTP, chamar Services, retornar respostas
- **Localização:** `src/controllers/`
- **Exemplo:** `ProgramController`, `InstitutionController`
- **Regra:** Controllers enxutos, sem lógica de negócio
- **Responsabilidade:** Tratamento de erros HTTP (400, 404, 500)

### Routes Layer (Definição de Endpoints)

- **Responsabilidade:** Mapear URLs para Controllers
- **Localização:** `src/routes/`
- **Exemplo:** `program.routes.ts`, `institution.routes.ts`
- **Padrão:** RESTful (GET, POST, PUT, DELETE)

**Fluxo de uma Requisição:**

```
HTTP Request → Route → Controller → Service → Repository → Database
                ↓         ↓           ↓          ↓
             Response ← Controller ← Service ← Repository
```

**Exemplo Prático (POST /api/institutions):**

1. **Route** (`institution.routes.ts`): `router.post('/', controller.create)`
2. **Controller** (`InstitutionController.ts`): Recebe `req.body`, valida HTTP status
3. **Service** (`InstitutionService.ts`): Valida campos obrigatórios, formata dados
4. **Repository** (`InstitutionRepository.ts`): Executa `prisma.institution.create()`
5. **Database**: SQLite persiste os dados
6. **Retorno**: Instituição criada retorna pela mesma cadeia até o cliente

## Endpoints

### Programs

- GET `/api/programs` - Listar todos
- GET `/api/programs/:id` - Buscar por ID
- POST `/api/programs` - Criar
- PUT `/api/programs/:id` - Atualizar
- DELETE `/api/programs/:id` - Deletar

### Institutions

- GET `/api/institutions` - Listar todas
- GET `/api/institutions/:id` - Buscar por ID
- POST `/api/institutions` - Criar
- PUT `/api/institutions/:id` - Atualizar
- DELETE `/api/institutions/:id` - Deletar

### Users

- GET `/api/users` - Listar todos
- GET `/api/users/:id` - Buscar por ID
- POST `/api/users` - Criar
- PUT `/api/users/:id` - Atualizar
- DELETE `/api/users/:id` - Deletar

### Favorites

- GET `/api/favorites/user/:userId` - Listar favoritos
- POST `/api/favorites` - Adicionar favorito
- DELETE `/api/favorites/:id` - Remover favorito

## Scripts

```bash
npm run dev              # Desenvolvimento
npm run build            # Compilar TypeScript
npm start                # Executar build
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Executar migrações
npm run prisma:studio    # Abrir Prisma Studio
npm run prisma:seed      # Popular banco
```

## Arquitetura

O backend segue o padrão de três camadas:

**Repository:** Acesso direto ao banco de dados via Prisma
**Service:** Lógica de negócio e validações
**Controller:** Manipulação de requisições HTTP

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DATABASE_URL` | Caminho do banco SQLite | `file:./dev.db` |
| `PORT` | Porta do servidor | `3001` |
| `FRONTEND_URL` | URL do frontend (CORS) | `http://localhost:3000` |
