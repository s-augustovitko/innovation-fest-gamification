api-dev: api-infra-up api-build api-run

api-infra-up:
	docker compose -f ./docker-compose.yml up -d mongodb mongodb-seed

api-deps:
	go mod tidy
	go install github.com/swaggo/swag/cmd/swag@latest

api-build: api-deps
	cd ./service-gamification/src && swag init && cd -
	go build -gcflags="all=-N -l" -o ./service-gamification/bin/service ./service-gamification/src/.

api-run:
	./service-gamification/bin/service

api-docker-build:
	@echo Building API image
	docker build -f ./service-gamification/Dockerfile . -t innovation-fest-gamification-api:latest

api-docker: api-docker-build
	docker compose -f ./docker-compose.yml up -d mongodb mongodb-seed api

frontend-docker-build:
	@echo Building Frontend image
	docker build -f ./client-gamification/Dockerfile . -t innovation-fest-gamification-frontend:latest

frontend-docker: frontend-docker-build
	docker compose -f ./docker-compose.yml up -d frontend

docker-all: api-docker-build frontend-docker-build
	docker compose -f ./docker-compose.yml up -d

docker-down:
	docker compose -f ./docker-compose.yml down

docker-clear:
	docker stop $$(docker ps -aq)
	docker rm $$(docker ps -aq)
