# **EarthTrack Technical Assessment**

EarthTrack Technical assessment for Backend using NestJs with TypeScript template and PostgreSQL as Database (deployed on remote - render)

## How to set up

Clone the repository

  ```bash
  git clone https://github.com/itsMeJivanDiaz/earthtrack-backend.git
  ```

#### Set the variables in the .env file

 - There is file a `.env.template` that can guide how to set up the .env file

 - e.g:

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

- Each service has its own Dockerfile in its directory but there is no need to execute it individually since we have a `docker-compose.yml` file sitting in the project's root directory.

  ```bash 
  docker-compose up
  ```
- Running this command will also run `npm run test`, `npm run build` and will start the server by executing `npm run start:prod`


## Testing

#### Testing each services

- Each services has its own .spec.ts files so just `cd` (Change directory) to a folder that needs to be tested and run:

  ```bash
  npm run test
  ```

## API Documentation (SWAGGER UI)

#### View documentation

- After starting the server, open browser and redirect to <http://localhost:3460/api>. This page contains the details of the APIs' usage

## Note:

- all the configuration (such as port and host) can be easily updated inside the docker-compose.yaml
