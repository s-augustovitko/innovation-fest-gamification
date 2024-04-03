# Innovation Fest Gamification

## Prerequisites

- Go v1.22.1
- Nodejs v21
- Docker

## Running everything in Docker

```
make docker-all
```

## API development

```
make api-dev
# for testing the frontend integrated with the API:
make frontend-docker # will run on localhost:4173
```

## Frontend development

```
make api-docker # will run on localhost:8080
cd client-gamification
npm install
npm run dev
```

## API

### Base Address

http://localhost:8080/

### Docs (Swagger)

After running the API locally, you can find the API docs here:
http://localhost:8080/swagger/index.html
