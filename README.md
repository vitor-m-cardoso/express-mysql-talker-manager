# Boas-vindas ao repositório do projeto _Talker Manager - Express MySQL Rest API_

## Entregáveis

<details>
  <summary><strong>O que foi desenvolvido:</strong></summary>

## 1 - Endpoint `/login`

- POST `/login`:
  - O corpo da requisição deverá ter o seguinte formato:

    ```json
    {
      "email": "email@email.com",
      "password": "123456"
    }
    ```

  - Caso a requisição esteja correta, o endpoint deverá retornar um código de `status 200` com o token gerado e o seguinte corpo:

    ```json
    {
      "token": "7mqaVRXJSp886CGr"
    }
    ```

  - O endpoint deve retornar um token aleatório a cada vez que for acessado.

- Validações para o endpoint `/login`:
  - Caso o campo `email` não seja passado, retorna um código de `status 400` com o seguinte corpo:

    ```json
    {
      "message": "O campo \"email\" é obrigatório"
    }
    ```

  - Caso o `email` passado não seja válido, retorna um código de `status 400` com o seguinte corpo:

    ```json
    {
      "message": "O \"email\" deve ter o formato \"email@email.com\""
    }
    ```

  - Caso o campo `password` não seja passado, retorna um código `status 400` com o seguinte corpo:

    ```json
    {
      "message": "O campo \"password\" é obrigatório"
    }
    ```

  - Caso a senha não tenha pelo menos **6 caracteres** retorna um código de `status 400` com o seguinte corpo:

    ```json
    {
      "message": "O \"password\" deve ter pelo menos 6 caracteres"
    }
    ```

## 2 - Endpoint `talker`

- GET `/talker`:
  - A requisição retorna o `status 200` e um array com todos os palestrantes cadastrados.
    - Exemplo:

    ```json
    [
      <!-- ... -->
      {
        "name": "Henrique Albuquerque",
        "age": 62,
        "id": 1,
        "talk": { "watchedAt": "23/10/2020", "rate": 5 }
      },
      <!-- ... -->
    ]
    ```

  - Caso não exista nenhum palestrante cadastrado, a requisição deve retornar o `status 200` e um array vazio.
    - Exemplo:

      ```json
      []
      ```

- GET `/talker/:id`:
  - A requisição retorna o `status 200` e um palestrante com base no `id` da rota.
    - Por exemplo, ao fazer uma requisição `/talker/1`, a resposta seria:

    ```json
    {
      "name": "Henrique Albuquerque",
      "age": 62,
      "id": 1,
      "talk": { "watchedAt": "23/10/2020", "rate": 5 }
    }
    ```

  - Caso um palestrante não seja encontrado, a requisição retorna o `status 404` com o seguinte corpo:

    ```json
    {
      "message": "Palestrante não encontrado"
    }
    ```

- À partir de agora, todas as rotas precisarão de um token de autenticação nos headers, no campo `authorization`.
  - Caso o token não seja encontrado, retorna um código de `status 401` com o seguinte corpo:

    ```json
    {
      "message": "Token não encontrado"
    }
    ```

  - Caso o token não seja válido, retorna um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```

- POST `/talker`:
  - O endpoint adiciona um novo palestrante ao arquivo;
  - Exemplo do corpo da requisição:

    ```json
    {
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

  - O campo `name` é **obrigatório** e deve ter no mínimo **3 caracteres**.
    - Caso o campo esteja vazio, retorna o código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"name\" é obrigatório"
      }
      ```

    - Caso o nome não tenha pelo menos **3 caracteres** retorna um código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O \"name\" deve ter pelo menos 3 caracteres"
      }
      ```

  - O campo `age` é obrigatório, é um número inteiro e apenas maiores de idade (mínimo `18 anos`) podem ser cadastrados.
    - Caso o campo não for passado retorna um código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"age\" é obrigatório"
      }
      ```

    - Caso o campo não seja um número (tipo `number`), inteiro, igual ou maior que 18, retorna o código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"age\" deve ser um número inteiro igual ou maior que 18"
      }
      ```

  - O campo `talk` deverá ser um objeto com as chaves `watchedAt` e `rate`:
  - O campo `talk` é obrigatório.
    - Caso o campo não seja informado, retorna o `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"talk\" é obrigatório"
      }
      ```

  - O campo `watchedAt` é obrigatório.
    - Caso o campo não seja informado, retorna o `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" é obrigatório"
      }
      ```

  - O campo `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.
    - Caso a data não respeite o formato, retorna o `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
      }
      ```

  - O campo `rate` é obrigatório.
    - Caso o campo não seja informado, retorna o `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" é obrigatório"
      }
      ```

  - O campo `rate` deve ser um número inteiro e deve ter o valor entre 1 e 5.
    - Caso o `rate` não seja um número inteiro (`int`) entre 1 e 5, retorna um `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" deve ser um número inteiro entre 1 e 5"
      }
      ```

  - Caso esteja tudo certo, retorna o `status 201` e a pessoa cadastrada com o seguinte corpo:

    ```json
    {
      "id": 1,
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

- PUT `/talker/:id`:
  - O endpoint edita um palestrante com base no `id` da rota, sem alterar o id registrado.
  - Exemplo de corpo da requisição:

    ```json
    {
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

  - O campo `name` é obrigatório e deve ter no mínimo **3 caracteres**.
    - Caso o campo não seja passado, retorna um código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"name\" é obrigatório"
      }
      ```

    - Caso o nome não tenha pelo menos **3 caracteres**, retorna um código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O \"name\" ter pelo menos 3 caracteres"
      }
      ```

  - O campo `age` é obrigatório, é um número inteiro (`int`) e apenas maiores de idade (**18 anos**) podem ser cadastrados.
    - Caso o campo não seja passado, retorna um código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"age\" é obrigatório"
      }
      ```

    - Caso o campo não seja um número (tipo `number`), inteiro (`int`), igual ou maior que 18, retorna um código de `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"age\" deve ser um número inteiro igual ou maior que 18"
      }
      ```

  - O campo `talk` é um objeto que possui as chaves `watchedAt` e `rate`
    - O campo `talk` é obrigatório, caso não seja informado retorna um `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"talk\" é obrigatório"
      }
      ```

    - O campo `watchedAt` é obrigatório e caso não seja informado retorna um `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" é obrigatório"
      }
      ```

    - O campo `watchedAt` deve ter o formato `dd/mm/aaaa` e caso não respeite o formato, retorna o `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
      }
      ```

    - O campo `rate` é obrigatório e caso não seja informado retorna o `status 400` com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" é obrigatório"
      }
      ```

  - Caso um palestrante não seja encontrado com base no `id` da rota, a requisição retorna o `status 404` com o seguinte corpo:

    ```json
    {
      "message": "Palestrante não encontrado"
    }
    ```

  - Caso tudo esteja certo, retorna o `status 200` e o palestrante editado.
    - Exemplo do retorno da requisição:

      ```json
      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 4
        }
      }
      ```

- DELETE `/talker/:id`:
  - O endpoint deleta um palestrante com base no `id` da rota e retorna o `status 204`, sem conteúdo na resposta.

- GET `/talker/search` com o parâmetro `q=searchTerm`:
  - O endpoint retorna um `array` de palestrantes que contenham em seu nome o termo pesquisado no _queryParam_ `q` da _URL_.
  - Retorna o `status 200` com o seguinte corpo:

    ```json
    /talker/search?q=Da
    ```

    ```json
    [
      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5,
        },
      }
    ]
    ```

  - Caso o `searchTerm` não seja informado ou esteja vazio, o endpoint retorna um array com todos os palestrantes cadastrados, com um `status 200`.

  - Caso nenhum palestrante satisfaça a busca, o endpoint retorna o `status 200` e um array vazio.

- GET `/talker/search` com o parâmetro `rate=rateNumber`:
  - O endpoint retorna um array de palestrantes cujo `rate` seja igual ao termo pesquisado no _queryParam_ `rate` da _URL_.

    ```json
    /talker/search?rate=5
    ```

    ```json
    [
      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5,
        },
      }
    ]
    ```

- GET `/talker/search` com o parâmetro `date=watchedDate`:
  - O endpoint retorna um array de palestrantes cujo `watchedAt` seja um valor igual ao termo pesquisado no _queryParam_ `date` da URL, retornando um `status 200`` com o seguinte corpo:

    ```json
    /talker/search?date=22/10/2019
    ```

    ```json
    [
      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5,
        },
      }
    ]
    ```

- PATCH `/talker/rate/:id`:
  - O endpoint altera uma avaliação de um palestrante com base no `id` da rota, sem alterar o id registrado.
  - O corpo da requisição tem o seguinte formato:

    ```json
    {
      "rate": 5
    }
    ```

  - Caso esteja tudo certo, retorna o `status 204` sem nenhum corpo.

- GET `/talker/db`:
  - Busca todos os palestrantes direto do banco de dados _MySQL_
  - A requisição retorna o `status 200` e um array com todos os palestrantes cadastrados.
    - Exemplo do retorno:

      ```json
      [
        {
          "name": "Henrique Albuquerque",
          "age": 62,
          "id": 1,
          "talk": { "watchedAt": "23/10/2020", "rate": 5 }
        },
        {
          "name": "Heloísa Albuquerque",
          "age": 67,
          "id": 2,
          "talk": { "watchedAt": "23/10/2020", "rate": 5 }
        },
        {
          "name": "Ricardo Xavier Filho",
          "age": 33,
          "id": 3,
          "talk": { "watchedAt": "23/10/2020", "rate": 5 }
        },
        {
          "name": "Marcos Costa",
          "age": 24,
          "id": 4,
          "talk": { "watchedAt": "23/10/2020", "rate": 5 }
        }
      ]
      ```

</details>

<details>
  <summary><strong>Habilidades:</strong></summary>

- Definir um _Servidor_;
- Utilizar o _Node.js_ com o _Express_ para criar uma rota de um endpoint de _API_;
- Utilizar o _Nodemon_ para auxiliar no desenvolvimento de _APIs Node.js_ com o _Express_;
- Utilizar o _Node.js_ com o _Express_ para **receber** e **tratar** requisições com parâmetros de:
  - Rota (**router params**);
  - Consulta (**query params**);
  - Corpo (**body**).
- Utilizar o _Node.js_ com o _Express_ para criar uma aplicação **CRUD**. - de criação (**create**), leitura (**read**), atualização (**update**) e remoção de dados (**delete**);
- Utilizar o _Thunder Client_ para fazer requisições a partir do VSCode.

</details>

## Objetivo

- Construir uma aplicação para cadastro de palestrantes, nessa aplicação é possível **cadastrar**, **visualizar**, **pesquisar**, **editar** e **excluir** informações;
- Desenvolver uma API de um CRUD (Create, Read, Update e Delete) de palestrantes;
- Desenvolver endpoints que irão ler e escrever em um arquivo utilizando o _módulo **fs**_.
