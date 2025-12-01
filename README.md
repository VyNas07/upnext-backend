# UpNext Backend API

Backend da plataforma UpNext - Sistema de gerenciamento de programas de formação em tecnologia.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Superset JavaScript com tipagem
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - ORM moderno para TypeScript
- **Swagger** - Documentação da API

## 📋 Pré-requisitos

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd upnext-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://usuario:senha@localhost:5432/upnext?schema=public"
FRONTEND_URL=http://localhost:3000
```

4. Execute as migrações do banco de dados:

```bash
npm run prisma:migrate
```

5. (Opcional) Popule o banco com dados de exemplo:

```bash
npm run prisma:seed
```

## 🎯 Como Rodar

### Modo Desenvolvimento

```bash
npm run dev
```

### Modo Produção

```bash
npm run build
npm start
```

## 📚 Documentação da API

Após iniciar o servidor, acesse:

- **Swagger UI**: <http://localhost:3001/api-docs>
- **Health Check**: <http://localhost:3001/health>

## 🗂️ Estrutura do Projeto

```
src/
├── config/           # Configurações (Swagger, etc)
├── controllers/      # Controladores (recebem requisições)
├── services/         # Lógica de negócios
├── repositories/     # Acesso ao banco de dados
├── routes/           # Definição de rotas
├── middlewares/      # Middlewares customizados
├── types/            # Tipos TypeScript
└── server.ts         # Arquivo principal

prisma/
├── schema.prisma     # Schema do banco de dados
└── seed.ts           # Dados iniciais
```

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente de execução | `development` |
| `PORT` | Porta do servidor | `3001` |
| `DATABASE_URL` | URL de conexão do PostgreSQL | - |
| `FRONTEND_URL` | URL do frontend (CORS) | `http://localhost:3000` |

## 📡 Endpoints Principais

### Programs

- `GET /api/programs` - Lista todos os programas
- `GET /api/programs/:id` - Busca programa por ID
- `POST /api/programs` - Cria novo programa
- `PUT /api/programs/:id` - Atualiza programa
- `DELETE /api/programs/:id` - Remove programa

### Institutions

- `GET /api/institutions` - Lista todas as instituições
- `GET /api/institutions/:id` - Busca instituição por ID
- `POST /api/institutions` - Cria nova instituição
- `PUT /api/institutions/:id` - Atualiza instituição
- `DELETE /api/institutions/:id` - Remove instituição

### Users

- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca usuário por ID
- `POST /api/users` - Cria novo usuário
- `PUT /api/users/:id` - Atualiza usuário

### Favorites

- `GET /api/favorites/:userId` - Lista favoritos do usuário
- `POST /api/favorites` - Adiciona programa aos favoritos
- `DELETE /api/favorites/:userId/:programId` - Remove dos favoritos

## 🧪 Scripts Disponíveis

```bash
npm run dev              # Roda em modo desenvolvimento
npm run build            # Compila TypeScript
npm start                # Roda versão compilada
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Abre Prisma Studio
npm run prisma:seed      # Popula banco com dados
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT
