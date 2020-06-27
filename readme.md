# Example Hasura GraphQL + Node + Next.js app

This repo is an example of a fullstack application using Hasura GraphQL engine with some role-based authorization. This is by no means a complete app, it serves as a weekend project to play around with [Hasura](https://hasura.io/).

## Tools
- TypeScript
- Next
- React + ChakraUI
- Express
- Redis
- GitHub as image host
- Hasura Graphql Engine
- Postgres
- Docker
- [undraw.co](https://undraw.co/) illustrations

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

## Architecture
![image](https://user-images.githubusercontent.com/7252454/85921711-54815500-b8a8-11ea-85c7-f0647c83cc8d.png)

## Notes
- This example only supports google sign-in. If you want another sign-in method you can add it on your own.
- To add restaurants, you need to manually set a user's `role` to be `owner`. To do this, edit the record directly from hasura console `http://localhost:8080/console`
- Everytime a new user signs up, the authentication service insert a new user to the DB. Currently, the authentication service do this via GQL mutation. It could write directly to DB if you want to do so.
- The GQL engine will call the authentication service to authenticate any incoming requests. If you don't want this, you can modify it so the auth service issues a JWT token to the frontend instead. [Read more about this in hasura docs](https://hasura.io/docs/1.0/graphql/manual/auth/authentication/jwt.html) 
- If you want to use this on production, you would probably want to do some codesplitting in the frontend app. I neglected it because I just wanted to mostly learn about Hasura 😃
