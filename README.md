# NodeJS API Assignment

## Table of content

- [Live Deployed Link](#live-deployed-link)
- [Project Structure](#project-structure)
- [How to Run Locally](#how-to-run-locally)
  - [Run with Docker](#run-with-docker)
  - [Run with NodeJS](#run-with-nodejs)
- [How to Run Automated Tests](#how-to-run-automated-tests)
- [Technologies Used](#technologies-used)
- [Preview](#preview)

---

## Live Deployed Link

- [API Endpoint](https://educational-management-e2qg.onrender.com)
- [API Swagger Documentation](https://educational-management-e2qg.onrender.com/api-docs)

---

---

## Project Structure

The project is structured as follows:

```bash
src
├── app.module.ts
├── common
│   ├── constant
│   │   └── index.ts
│   ├── filter
│   │   └── http-exception.filter.ts
│   └── mock-test
│       └── prisma-service.mock.ts
├── main.ts
├── prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── structure.txt
└── teacher
    ├── dto
    │   ├── get-common-students-request.dto.ts
    │   ├── register-request.dto.ts
    │   ├── retrieve-notifications-request.dto.ts
    │   └── suspend-request.dto.ts
    ├── teacher.controller.spec.ts
    ├── teacher.controller.ts
    ├── teacher.module.ts
    ├── teacher.service.spec.ts
    └── teacher.service.ts
```

## How to Run Locally

1.  Clone the repository:
    ```sh
    git clone git@github.com:dienphamvan/educational_management.git
    cd educational_management
    ```
2.  Make a copy of .env.example and rename it to .env.docker, then fill in the required environment variables.

    ```bash
    DATABASE_URL=mysql://root:root@database:3306/educational_management
    MYSQL_ROOT_PASSWORD=root
    MYSQL_DATABASE=educational_management
    PORT=3001
    ```

3.  Ensure you have [Docker](https://www.docker.com/) installed.

#### Run with Docker

1. Build and run the container:

   ```sh
   docker compose --env-file .env.docker up -d
   ```

   _Note: Above command will pull mysql image, build the application image and run the containers._

2. The api should now be accessible at `http://localhost:3001`

3. Clean up the container and image:

   ```sh
   docker compose down -v --rmi all
   ```

   _Note: Above command will stop and remove the containers, the images and also volumes_

#### Run with NodeJS

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Pull and start the mysql container:

   ```sh
   docker compose --env-file .env.docker up -d database
   ```

   _Note: Above command will pull mysql image and run the container._

3. Install the dependencies:

   ```sh
    npm install
   ```

4. Run the application:

   ```sh
   npm run start:dev
   ```

5. The application should now be accessible at `http://localhost:3000`

6. Clean up the container:

   ```sh
   docker compose down -v --rmi all
   ```

---

## How to Run Automated Tests

1. Ensure that Node.js is installed and dependencies are installed (npm install).
2. To execute the automated tests, use the following command:

```sh
npm run test
```

For a detailed report, run:

```sh
npm run test:cov
```

![coverage](./docs/coverge.png)

---

## Technologies Used

- Backend: [Node.js](https://nodejs.org/), [NestJS](https://nestjs.com/)
- Database: [MySQL](https://www.mysql.com/), [Prisma](https://www.prisma.io/)
- Testing: [Jest](https://jestjs.io/)

## Preview

- Register API
  ![/api/register](./docs/register.png)

- Get Common Students API
  ![/api/commonstudents](./docs/commonstudents.png)

- Suspend API
  ![/api/suspend](./docs/suspend.png)

- Retrieve Notifications API
  ![/api/retrievefornotifications](./docs/retrievefornotifications.png)
