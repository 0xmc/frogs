FROM golang:1.26 AS builder
WORKDIR /src
COPY go.mod ./
COPY *.go ./
COPY static ./static
# Static binary: no libc, no loader.
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -trimpath -ldflags="-s -w" -o /out/frogs .

FROM scratch
LABEL org.opencontainers.image.source="https://github.com/0xmc/frogs"
COPY --from=builder /out/frogs /frogs
EXPOSE 8080
ENTRYPOINT ["/frogs"]
