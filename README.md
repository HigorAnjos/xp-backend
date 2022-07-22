<h1 align="center">:fleur_de_lis: xp-backend</h1>

<p align="center">Projeto para processo seletivo da xp :rocket: </p>

<p align="center">
  <a href="#Node">Node</a> •
  <a href="#Docker-Compose">Docker-Compose</a> •
  <a href="#Tecnologias">Tecnologias</a> •
  <a href="#Autor">Autor</a>
</p>



## Swagger
A documentacao da api esta disponivel no [swagger](http://xpbackend.herokuapp.com/docs/).

Como a aplicacao esta no heroku, pode demorar um pouco para carregar a documentacao.

---

## Node

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

## Rodando com Node

```bash
# Clone este repositório
$ git clone git@github.com:HigorAnjos/xp-backend.git

# Acesse a pasta do projeto no terminal/cmd
$ cd xp-backend

# Instale as dependências
$ npm install

# iniciar o projeto
$ npm start
```

A aplicação estara disponivel em ```http://localhost:3000/```

---

## Docker-Compose

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/install/).

## Rodando com o doker-compose

```bash
# Clone este repositório
$ git clone git@github.com:HigorAnjos/xp-backend.git

# Rodar o docker-compose
$ docker compose up -d

# Acessar a aplicação docker
$ docker exec -it xp_backend_node bash

# Instale as dependências
$ npm install

# Popule o banco de dados
$ npm run db:init

# Rodar o projeto
$ npm start
```

A aplicação estara disponivel em ```http://localhost:3000```

Parar o container
```bash
$ docker compose down
```
---

