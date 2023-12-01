# **EarthTrack Technical Assessment**

EarthTrack Technical assessment for Backend using NestJs with TypeScript template and PostgreSQL as Database (deployed on remote - render.com)

## How to set up

Clone the repository

  ```bash
  git clone https://github.com/itsMeJivanDiaz/earthtrack-backend.git
  ```

#### Set the variables in the .env file

 - Note: Refer to the `.env.template` file for guidance on setting up the `.env` file.

 - Create a file named `.env` at the root level.

 - The contents of the file should look like:

    ```javascript
    # DATABASE CONFIGURATIONS
    PG_HOST=your_pg_host_here
    PG_PORT=your_pg_port_here
    PG_USER=your_pg_user_here
    PG_PASSWORD=your_pg_password_here
    PG_DATABASE=your_pg_database_here

    # SECRETS
    AUTH_SECRET=your_random_secret_here
    ```

#### Build docker container

- Each service has its own Dockerfile in its directory but there is no need to execute it individually because there is a `docker-compose.yml` file in the project's root directory.

  ```bash 
  docker-compose up
  ```

- Running this command will also run `npm run test`, `npm run build` and will start the server by executing `npm run start:prod`

- default server is `http://localhost:3460`

## Testing

#### Testing each services

- Each services has its own .spec.ts files. To test a specific service, navigate (cd) to its folder and run:

  ```bash
  npm run test
  ```

## API Documentation (SWAGGER UI)

#### View API documentation

- After starting the server, open browser and redirect to <http://localhost:3460/api>. This page contains the details of the API usage

## Note:

- all the configuration (such as port and host) can be easily updated inside the docker-compose.yaml
