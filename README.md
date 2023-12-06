# Cluster API

## Simple

- A Simple API running
- with graceful shutdown

## Cluster

- A API running by a Cluster,
- running some working to make the load balancer with processes
- also, it make a auto scale of processes
- uses a rich graceful shutdown, with logs, disconections and capture errors no treated

### Run

- Run app:
  
```sh
npm start
```

- Run load testing:
  
```sh
npm test
```

#### Pending

- [ ] rota comum 200
- [ ] rota com memory leak
- [ ] rota com erro nao tratado
- [ ] rota com erro de promise nao tratado
- [ ] rota que gera um kill
