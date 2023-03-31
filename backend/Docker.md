# Docker Guide 🐳

## Installation

### Docker

- To install Docker, follow the instructions on the [Docker website](https://docs.docker.com/install/).

### Docker Compose

- To install Docker Compose, follow the instructions on the [Docker Compose website](https://docs.docker.com/compose/install/).

### Run Docker Compose

- To run a Docker Compose project with the `docker-compose.yml` file, use the following command:

  `docker-compose up`

- To run a Docker Compose project in the background, use the following command:

  `docker-compose up -d`

- To build a Docker Compose project, use the following command:

  `docker-compose build`

- To build a Docker Compose project and remove all volumes, use the following command:

  `docker-compose build --no-cache`

- To start a Docker Compose project, use the following command:

  `docker-compose start`

- To start a Docker Compose project in the background, use the following command:

  `docker-compose start -d`

- To stop a Docker Compose project, use the following command:

  `docker-compose down`

- To stop a Docker Compose project and remove all volumes, use the following command:

  `docker-compose down -v`

- To stop a Docker Compose project and remove all volumes and images, use the following command:
  `docker-compose down -v --rmi all`
