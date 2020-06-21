This directory is used to create migration and export metadata

Requires CMD to be run with administrator privileges.

## Creating migration and export metadata
Run postgres and graphql-engine on port 8080, then:
```
hasura migrate create migrate-rr --from-server --endpoint http://localhost:8080
hasura metadata export --endpoint http://localhost:8080
```

## Applying migration and metadata
Run postgres and graphql-engine on port 8080, then:
```
hasura migrate apply
hasura metadata apply
```