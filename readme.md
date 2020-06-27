# Example Hasura GraphQL + Node + Next.js app

This repo is an example of a fullstack application using Hasura GraphQL engine with some role-based authorization. This is by no means a complete app, it serves as a weekend project to play around with [Hasura](https://hasura.io/).

## Stack
- TypeScript
- Next
- React + ChakraUI
- Express
- Redis
- GitHub as image host
- Hasura Graphql Engine
- Postgres
- Docker

## At a glance
![app](https://user-images.githubusercontent.com/7252454/85921286-76c5a380-b8a5-11ea-91a8-2f6a0eb43615.gif)

## Developing
0. Install dependencies
    ```sh
    yarn install
    ```

1. Setup `.env` file for backend
    - Create a `.env.dev` file, use `.env.example` as reference
    - `GITHUB_IMAGE_REPO_OWNER`, `GITHUB_IMAGE_REPO_NAME`, and `GITHUB_ACCESS_TOKEN` are needed for image uploads (when creating a new restaurant)
      - The app upload images into a github repo. See this [repo](https://github.com/jackyef/test-db) for example
    - `GOOGLE_OAUTH_CLIENTID` and `GOOGLE_OAUTH_SECRET` are needed for google sign-in to work. Refer to https://developers.google.com/identity/sign-in/web/sign-in on how to get them

2. Run the backend
    ```sh
    docker-compose up # start everything up
    ```
    
    Note that if there are changes to Dockerfile.dev or new packages installed, a rebuild is necessary.
    ```sh
    docker-compose up --build server
    ```

    If you encountered an error that says `"Unhandled exception: Filesharing has been cancelled"`, you need to allow Docker file sharing on your project's directory.

3. Run the frontend
    ```sh
    cp ./client/env.example ./client/.env # prepare the .env file for frontend app

    yarn dev # start the frontend dev server on port 3000
    ```

4. Setup Postgres DB tables and Hasura graphql engine metadata
    ```sh
    yarn global add hasura-cli # hasura-cli is needed to perform this

    cd hasura
    hasura migrate apply
    hasura metadata apply
    ```

## Notes
- This example only supports google sign-in.
- To add restaurants, you need to manually set a user's `role` to be `owner`. To do this, edit the record directly from hasura console `http://localhost:8080/console`
 