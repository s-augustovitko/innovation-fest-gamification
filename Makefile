api: infra-up build-api run-api

infra-up:
	docker compose -f ./service-gamification/docker-compose.yml up -d

infra-down:
	docker compose -f ./service-gamification/docker-compose.yml down

api-deps:
	go mod tidy
	go install github.com/swaggo/swag/cmd/swag@latest

build-api: api-deps
	cd ./service-gamification/src && swag init && cd -
	go build -gcflags="all=-N -l" -o ./service-gamification/bin/service ./service-gamification/src/.

run-api:
	./service-gamification/bin/service
