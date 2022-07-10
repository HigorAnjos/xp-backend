<h1 align="center">:fleur_de_lis: xp-backend</h1>

<p align="center">Projeto para processo seletivo da xp :rocket: </p>

<p align="center">
  <a href="#Node">Node</a> •
  <a href="#Postman">Postman</a> •
  <a href="#Tecnologias">Tecnologias</a> •
  <a href="#Autor">Autor</a>
</p>


## `user/`

<details close>
  <summary>:point_right: Criar um novo usuario endpoint.</summary>
  <br>

- O endpoint deve ser acessível através do caminho (`/user/create`);

  - A requisicao `POST /user/create` deve conter o seguinte `body`:

  <br>

  ```json
      {
        "name": "higor anjos",
        "email": "higorc.anjos@gmail.com",
        "password": "123456"
      }
  ```

  > :heavy_check_mark: Caso sucesso retornara o id deste usuario.
  - API deve responder com status http `201` e o seguinte `body`:
    ```json
      {
        "id": 5
      }
    ```

  > :x: Por algum motivo nao seja possivel.

  - API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "error": "Erro ao criar usuário" }
    ```
</details>

<details close>
  <summary>:point_right: Login usuario endpoint.</summary>

  <br>

- O endpoint deve ser acessível através do caminho (`/user/`);

  - A requisicao `POST /user/` deve conter o seguinte `body`:

  <br>

  ```json
      {
        "email": "higorc.anjos@gmail.com",
        "password": "123456"
      }
  ```

  > :heavy_check_mark: Caso sucesso retornara o token para este usuario.
  - API deve responder com status http `200` e o seguinte `body`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      }
    ```

  > :x: Por algum motivo nao seja possivel.

  - API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "error": "Senha ou email incorretos" }
    ```
</details>

<details close>
  <summary>:point_right: Atualizar usuario endpoint.</summary>

  <br>

- O endpoint deve ser acessível através do caminho (`/user/update`);

  - A requisicao `PUT /user/update` deve conter o seguinte `headers` com o token de login:

  <br>

  ```json
    {
      "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
  ```

  - A requisicao `PUT /user/update` deve conter o seguinte `body`:

  <br>

  ```json
      {
        "name": "higor anjos",
        "email": "higorc.anjos@gmail.com",
        "password": "123456"
      }
  ```

  > :heavy_check_mark: Caso sucesso retornara o token para este usuario.
  - API deve responder com status http `200` e o seguinte `body`:
    ```json
      {
        "message": "Usuário atualizado com sucesso"
      }
    ```

  > :x: Por algum motivo nao seja possivel.

  - API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "error": "Não foi possivel atualizar o usuário" }
    ```
</details>

<details close>
  <summary>:point_right: Deletar usuario endpoint.</summary>

  <br>

- O endpoint deve ser acessível através do caminho (`/user/delete`);

  - A requisicao `DELETE /user/delete` deve conter o seguinte `headers` com o token de login:

  <br>

  ```json
    {
      "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    }
  ```


  > :heavy_check_mark: Caso sucesso retornara o token para este usuario.
  - API deve responder com status http `200` e o seguinte `body`:
    ```json
      {
        "message": "Usuário removido com sucesso"
      }
    ```

  > :x: Por algum motivo nao seja possivel.

  - API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "error": "Não foi possivel remover o usuário" }
    ```
</details>

<br>


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

