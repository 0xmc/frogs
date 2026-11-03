# frogs

- A Go HTTP server (`main.go`, `frogs.go`) with its page embedded from
  `static/`. No dependencies beyond the standard library.
- It runs on Datum Compute's `unikernel` runtime class. Keep the binary static
  (`CGO_ENABLED=0`, no `-buildmode=pie`): `datumctl compute build --analyze`
  rejects Go's PIE build because it asks for a dynamic loader.
- Run `gofmt -l .`, `go vet ./...`, and `go test -race ./...` before
  committing.
