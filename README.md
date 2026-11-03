# frogs

A page of 10 objectively cute frogs. **Cute** shows the next frog. **Not
cute** is an error: the server returns HTTP 500 and the page throws it.

The app is one static Go binary with its page embedded. It runs as a unikernel
on Datum Compute at <https://frogs.decaying.org>.

| Path | Behavior |
| --- | --- |
| `GET /` | The page |
| `GET /api/frogs` | The frog list as JSON |
| `POST /api/not-cute` | Always `500` with `{"error": "..."}` |
| `GET /healthz` | `200 ok` |

Photos are hotlinked from Wikimedia Commons. Each frog links to its file page,
which has the license.

## Run locally

```sh
go test -race ./...
go run .
```

Then open <http://localhost:8080>. Set `PORT` to listen elsewhere.

## Build and deploy

The workload runs in the `project-drw8v` project. The unikernel runtime needs
a static binary, so the Dockerfile builds with `CGO_ENABLED=0` on a `scratch`
base. Use a new tag for every build.

```sh
datumctl compute build --analyze --push --output ghcr.io/0xmc/frogs:unikernel-N .
datumctl compute deploy frogs --project project-drw8v --image=ghcr.io/0xmc/frogs:unikernel-N
```

To deploy from `workload.yaml` instead, update its image digest first and run
`datumctl compute deploy -f workload.yaml --project project-drw8v`.

`frogs.decaying.org` is set in the `frogs` HTTPProxy's `spec.hostnames`. The
platform creates the `frogs` DNS record in the `decaying.org` zone and issues
the certificate. Deploys keep the hostname.
