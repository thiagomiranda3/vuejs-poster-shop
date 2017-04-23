### Vue.js Poster Shop

Projeto criado para acompanhar o curso de Vue.JS do Udemy. O link para o curso completo está [aqui](https://www.udemy.com/vuejs-2-essentials/)

#### Pre-instalação

1. Garanta que o NPM está instalado na sua máquina
2. Faça o registro Oauth 2 para o [Imgur API](https://api.imgur.com/oauth2/addclient).

    Registre sua aplicação para OAuth 2 sem a URL de callback. Você pode nomear sua aplicação como quiser. O importante é conseguir a *client ID*.

#### Instalação

1. Clone o repositório para a sua máquina

    ```
    cd /path/to/install/location
    git clone git@github.com:vuejsdevelopers/vuejs-poster-shop.git
    ```

2. Instale as dependências

    ```
    npm install
    ```

3. Crie um arquivo `.env` de acordo com o modelo de exemplo

    ```
    cp .env_sample .env
    ```
    
	Agora, coloque sua client ID na propriedade `IMGUR_CLIENT_ID`
    
4. Inicie o projeto

    ```
    npm run start
    ```

5. Seu site estará disponível em *localhost:[PORT]* onde `PORT` será qualquer valor que você definiu no arquivo `.env`.
