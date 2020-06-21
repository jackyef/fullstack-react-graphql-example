# Restaurant Reviews Web App

## Stack
- TypeScript
- Next
- React + ChakraUI
- Express
- Redis
- GitHub as image host
- Hasura Graphql Engine
- Postgres

## Developing
0. Install dependencies
    ```sh
    yarn install
    ```
1. Setup `.env` file for backend
    - Create a `.env.dev` file, use `.env.example` as reference
    - `GITHUB_IMAGE_REPO_OWNER`, `GITHUB_IMAGE_REPO_NAME`, and `GITHUB_ACCESS_TOKEN` are needed for image uploads (when creating a new restaurant)
    - `GOOGLE_OAUTH_CLIENTID` and `GOOGLE_OAUTH_SECRET` are needed for google sign-in to work. Refer to https://developers.google.com/identity/sign-in/web/sign-in on how to get them

2. Run the backend
    ```sh
    docker-compose up -d # start everything up
    ```
    
    Note that if there are changes to Dockerfile.dev or new packages installed, a rebuild is necessary.
    ```sh
    docker-compose up --build server
    ```
3. Run the frontend
    ```sh
    yarn dev # start the next development build on port 3000
    ```

## Stack
- Postgres for DB
- Hasura graphql engine for automatic GQL queries integrated with postgres
- NodeJS server to perform authentication and image uploading to github
- Redis for persisting session on NodeJS server restarts
- NextJS frontend
