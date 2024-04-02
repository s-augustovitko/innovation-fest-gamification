# Go Rest API

The service is implemented as a Rest API using the [Gin](https://github.com/gin-gonic/gin) framework.

## Prerequisites

- Go v1.22.1
- Docker

## Config

Service config reads from env variables set on file: 
```
config.env
```

## Building and running

```
make api
```

#### Infra only

```
make infra-up
```

#### Building the API only

```
make build-api
```

#### Running only

```
make run-api
```

## API docs (Swagger)

After running the API locally, you can find the API docs here:
http://localhost:8080/swagger/index.html
