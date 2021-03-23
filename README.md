## Exemplo de aplicação usando Jest e configuração GlobalSetup

## 🚀 Instalação e execução dos testes

1. Faça um clone desse repositório;
2. Entre na pasta do projeto pelo terminal;
3. Rode `yarn` para instalar as dependências;

### ⚙ Criação e configuração do banco de dados

1. Crie um container para o banco de dados usando docker

   `docker run --name teste -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

2. Crie uma base de dados do Postgres;
3. No arquivo **.env.test** modifique as credenciais (host, database, user, password);

## Executar testes

Utilizando GlobalSetup (esta parte está dando erro)

1. Rode `yarn test` para rodar todos os testes;

Utilizando script (isso funciona normalmente)

1. No arquivo **jest.config.js** mude a configuração globalSetup para undefined;
2. Rode `yarn test:setup`;
3. Rode `yarn test`;
