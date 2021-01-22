# Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## 🎲 Compilando o Front End (Client)

```bash
# Clone este repositório
$ git clone <https://github.com/jjuhbotelho/compliance-frontend>

# Acesse a pasta do projeto no terminal/cmd
$ cd compliance-frontend

# Vá para a pasta server
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor compilado inciará na porta:3000 - acesse <http://localhost:3000>
```

# Como utilizar

## Criando uma votação

Para criar uma nova votação basta clicar em "Create Poll", onde econtrará o formulário para inserir o título e os restaurantes da votação.

## Para votar

Para votar, basta acessar a página de sua votação e selecionar o restaurante desejado. Após iosso terá acesso também, aos resultados.

## Para ver o resultado

Entre na página de sua votação e clique em "Ver Resultados"

# Destaques



# Melhoria

A ideia inicial em si era fazer a representação dos restaurantes em cards, com um formulário para cadastrar cada restaurante contendo informações como: nome, local, tipo de comida, valor e possiveis imagens do ambiente. Após o cadastro, para realizar a votação, deveria antes selecionar a data por meio de um datepicker e o funcionário que irá votar por meio de um select. Com base nessas informações eu construiria a validação necessário para a primeira e segunda estórias, onde o restaurante previamente selecionado durante a semana ficaria desabilitado, assim como o funcionário que já votou na data.