## Hosted application

The application is hosted on Render. You can access it by going to the following links:

- [API](https://class-admin.onrender.com)
- [API Document](https://class-admin.onrender.com/api-docs)

_Because it's just a free tier, the application may be slow to respond at first access._

## Local application

Pre-requisites:

- Docker installed

If you just want to minimally set up to manually test the application locally, you can follow these steps below:

Step 1: Clone the repository

```bash
git clone git@github.com:dienphamvan/class_admin.git
```

Step 2: Create a .env.docker file in the root of the project with the following content:

- Copy .env.example
- Rename it to .env.docker
- Paste following variables:

```bash
DATABASE_URL=mysql://root:root@database:3306/educational_management
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=educational_management
MYSQL_USER=root
MYSQL_PASSWORD=root
PORT=3001
```

Step 3: Pull images, create containers and start the application (See details in docker-compose.yml and Dockerfile)

- Run the following command to start application:

```bash
docker compose --env-file .env.docker up -d
```

This will start the application on port 3001. You can access it by going to http://localhost:3001

-To unit test the application (was running in docker), you can run the following command:

```bash
npm run docker:app-test
```
