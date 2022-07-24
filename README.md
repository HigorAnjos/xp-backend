<h1 align="center">:fleur_de_lis: xp-backend</h1>

<p align="center">Projeto para processo seletivo da xp :rocket: </p>
<p align="center">Essa api backend simula gerenciar compras e vendas de ativos do mercado de ações</p>

<p align="center">
  <a href="#Swagger">Swagger</a> •
  <a href="#Heroku">Heroku</a> •
  <a href="#Node">Node</a> •
  <a href="#Docker-Compose">Docker-Compose</a> •
  <a href="#Tecnologias">Tecnologias</a> •
  <a href="#Autor">Autor</a>
</p>



## Swagger
A documentacao da api esta disponivel no [swagger](https://xpbackend.herokuapp.com/docs/).

Como a aplicacao esta no heroku, pode demorar um pouco para carregar a documentacao.

---
## Heroku

O projeto esta disponivel online no
[Heroku :smile:](https://xpbackend.herokuapp.com/)

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

# Popule o banco de dados
$ npm run db:init

# iniciar o projeto
$ npm start
```

A aplicação estara disponivel em ```http://localhost:3001/```

A documentacao estara disponivel em ```http://localhost:3001/docs/```

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
$ docker-compose up -d

# Acessar a aplicação docker
$ docker exec -it xp_backend_node bash

# Instale as dependências
$ npm install

# Popule o banco de dados
$ npm run db:init

# Rodar o projeto
$ npm start
```

A aplicação estara disponivel em ```http://localhost:3001```

A documentacao estara disponivel em ```http://localhost:3001/docs/```

Parar o container
```bash
$ docker-compose down
```
---

## Sobre
<p>
  Esse projeto tem como finalidade a participacao do processo seletivo para XP. Ele foi organizado com a arquitetura MSC.
  E seu banco relacional foi desenvolvido com o sequelize. 
  Ele consiste em um Api Rest, que gerencia o fluxo do banco de dados.
</p>

### Arquitetura MSC

  - Model
  
    <p> A camada da model foi abstraida pela biblioteca ORM(Object-Relational Mapping), Sequelize.</p>
   
  - Service
   
    <p> Na camada o service se encontra a regra de negocio e a comunicação com o ORM.</p>
    
  - Controller

    <p> As funções na camada de Controller recebem as requisições e trás as respostas </p>
   
---

   **:point_up: Além disso, a arquitetura utilizada conta com middlewares:**
   
   Eles são utilizados entre a requisição e a resposta. No projeto está sendo utilizado apenas para validações dos campos antes de chegar na camada do controller.

---
  
### Modelagem do banco de dados :classical_building: :game_die:

  O sequelize foi utilizado para modelar(models) o banco de dados, criar as tabelas(migrations) e inserir dados iniciais(seeders), que são utilizados para testes.
  Além disso, o sequelize traz métodos que podem ser utilizados por vários dialetos de bancos suportados pela biblioteca.
  Para desenvolvimento utilizei mysql, e a aplicação se comunica com um banco de dados postgres na plataforma de deploy heroku.
  
  
  ![Banco Relacional](https://github.com/HigorAnjos/xp-backend/blob/dev/models_db.png)

---

## Tecnologias :hammer_and_wrench:

Essas tecnologias foram escolhidas com base no domínio e experiência que tenho sobre elas. Principalmente quando considerado o tempo para realização do desafio e o meu foco em Backend. Essas ferramentas são tecnologias muito difundidas e testadas pela comunidade, o que passa maior credibilidade.

As seguintes ferramentas foram usadas na construção do projeto:

- [Git](https://git-scm.com/)
- [Github Actions :octocat:](https://docs.github.com/pt/actions)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JWT :closed_lock_with_key:](https://jwt.io/)
- [Node](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Eslint :lipstick:](https://eslint.org/)
- [Sequelize](https://sequelize.org/docs/v6/getting-started/)
- [Docker-Compose :whale2:](https://docs.docker.com/compose/)
- [Editor Config](https://editorconfig.org/)
- [Nodemoon :crescent_moon:](https://www.npmjs.com/package/nodemon)

Voce pode verificar todas ferramentas no arquivo [package.json](https://github.com/HigorAnjos/xp-backend/blob/main/package.json), em dependencies e devDependencies.


# Autor

<img alt="Higor Anjos" title="Higor Anjos" src="https://avatars.githubusercontent.com/u/38214470?v=4" height="100" width="100" />

Made with 💜 by Higor Anjos 👋

[![LinkedIn Badge](https://img.shields.io/badge/-Higor_Anjos-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/higoranjos)](https://www.linkedin.com/in/higoranjos)



