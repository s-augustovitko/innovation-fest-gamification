# default account - can be overwritten by build/arg params in docker compose yaml
ARG VERSION="1.22-bullseye"

FROM --platform=linux/amd64 golang:${VERSION} as builder

COPY . /go/src/
WORKDIR /go/src/

RUN make api-deps ;\
    cd ./service-gamification/src && swag init
RUN GOOS=linux go build -o main ./service-gamification/src


FROM --platform=linux/amd64 golang:${VERSION}

WORKDIR /service

COPY --from=builder /go/src/main main
COPY --from=builder /go/src/service-gamification/config.docker.env service-gamification/config.env

RUN mkdir /service ;\
    addgroup --system dcp ;\
    adduser --system --disabled-password --no-create-home --home /service --ingroup dcp dcp ;\
    chown -R dcp:dcp /service

# Switch current root user to dcp, prevent running service from root
USER dcp

# Run service
ENTRYPOINT ["./main"]
